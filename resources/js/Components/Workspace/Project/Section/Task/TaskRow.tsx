import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { PageProps, Priority, Task, User } from "@/types"
import { cn } from "@/utils";
import { router, useForm, usePage } from "@inertiajs/react";
import { CornerDownRight, Plus } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { ProjectViewProps } from "../../ProjectViewLayout";
import { Button } from "@/Components/Button";
import { Avatar, AvatarFallback, } from "@/Components/Avatar";
import { Calendar } from "@/Components/Calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/Components/Badge";
import { Sheet, SheetTrigger } from "@/Components/Sheet";
import { TaskSheet } from "./TaskSheet";
import { useDebounce } from "@/hooks/useDebounce";
import { SelectSingleEventHandler } from "react-day-picker";

type TaskRowProps = {
    task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
    const [currTask, setCurrTask] = useState<Task>(task);
    const [debouncedTask] = useDebounce(currTask, 1000);
    const [nameHovered, setNameHovered] = useState(false);

    const patchTask = useCallback(() => {
        router.patch(route('task.update', { task: task.id }), debouncedTask as any);
    }, [])
    
    useEffect(() => {
        patchTask();
    }, [patchTask])

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrTask((prev) => {
            return {...prev, name: event.target.value}
        });
    }

    const handleConfirmNameChange = () => {
    }

    const handleSelectAssignee = (user: User) => {
        setCurrTask((prev) => {
            return {...prev, user: user}
        });
    }

    const handleSelectPriority = (value: Priority) => {
        setCurrTask((prev) => {
            return {...prev, priority: value}
        });
    }

    const handleSelectDueDate = (value: Date) => {
        setCurrTask((prev) => {
            return {...prev, due_date: new Date(value).toDateString()}
        })
    }
    
    return (
        <div className="w-full flex items-center text-textcolor text-sm font-thin hover:bg-bgactive">
            <div className="flex w-[60%] items-center border-y-[1px] border-r-[1px] border-bordercolor pl-10" onMouseEnter={() => setNameHovered(true)} onMouseLeave={() => setNameHovered(false)}>
                <TaskColumnName value={currTask.name || ''} onChange={handleNameChange} className="bg-inherit w-full p-[0.41rem] focus:bg-bgactive rounded-md select-none" onBlur={handleConfirmNameChange} />
                {nameHovered ? (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="h-7 px-2 text-xs text-textcolor hover:bg-dark-gray">
                                <CornerDownRight className="h-4" />
                                Open
                            </Button>
                        </SheetTrigger>
                        <TaskSheet task={task} />
                    </Sheet>
                ): null}
            </div>
            <div className="grow grid grid-cols-3">
                <div className=" border-y-[1px] border-r-[1px] border-bordercolor">
                    <TaskColumnAssignee assignee={currTask.user} task={task} onSelect={handleSelectAssignee} />
                </div>
                <div className=" min-h-full border-y-[1px] border-r-[1px] border-bordercolor">
                    <TaskColumnDueDate onSelect={handleSelectDueDate} task={task} />
                </div>
                <div className=" min-h-full border-y-[1px] border-r-[1px] border-bordercolor">
                    <TaskColumnPriority onSelect={handleSelectPriority} value={currTask.priority} />
                </div>
            </div>
        </div>
    )
}

export const TaskColumnName = ({ className, type, isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) inputRef.current?.focus();
    }, []);

    return (
        <input
            {...props}
            className={cn(
                "focus:ring-0 focus:ring-offset-0 focus:border-transparent border-transparent",
                className
            )}
            ref={inputRef}
        />
    )
}

type TaskColumnAssigneeProps = {
    assignee?: User | null;
    task?: Task;
    onSelect?: (value: User) => void;
}

export const TaskColumnAssignee = ({ assignee, onSelect = () => {} }: TaskColumnAssigneeProps) => {
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="w-full justify-start gap-2" role="combobox">
                    {assignee?.name ? (
                        <>
                            <Avatar>
                                <AvatarFallback className="bg-blue text-textcolor" >{props.data.members.find((value) => value.id === assignee.id)?.name[0]}</AvatarFallback>
                            </Avatar>
                            {props.data.members.find((value) => value.id === assignee.id)?.name}
                        </>
                    )
                    : "Unassigned"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-nav text-textweak p-0 border-bordercolor">
                <Command>
                    <CommandInput className="focus:ring-0 focus:ring-offset-0 focus:border-transparent border-transparent" placeholder="Search members..." />
                    <CommandEmpty>No members found</CommandEmpty>
                    <CommandGroup>
                        <div className="flex items-center justify-center">
                            <p className="text-textweak text-sm" >Select one people</p>
                        </div>
                        {props.data.members.map((member) => {
                            const handleSelect = () => {
                                onSelect(member)
                                setOpen(false);
                            }

                            return (
                                    <CommandItem
                                        key={member.id}
                                        value={member.name}
                                        onSelect={handleSelect}
                                        className="gap-2 hover:bg-bgactive"
                                    >
                                        <Avatar>
                                            <AvatarFallback className="bg-blue text-textcolor">{member.name[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {member.name}
                                    </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export const TaskColumnDueDate = ({ onSelect = () => {}, task }: { onSelect?: (date:Date) => void; task: Task }) => {
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [date, setDate] = useState<Date>(new Date(task.due_date));

    const handleSelectDate = (date: Date) => {
        onSelect?.(date);
        setDate(date);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="text-textcolor font-thin items-center w-full justify-start">
                    {task.due_date ? format(date, "PPP") : <span>Pick Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-nav text-textweak p-0 border-bordercolor w-auto">
                <Calendar 
                    mode="single"
                    selected={date}
                    onSelect={handleSelectDate as SelectSingleEventHandler}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

type TaskColumnPriorityProps = {
    onSelect?: (value: Priority) => void;
    value?: Priority;
}

export const TaskColumnPriority = ({ onSelect = () => {}, value }: TaskColumnPriorityProps) => {
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [priorities] = useState<Priority[]>([
        { id: 1, name: 'High', created_at: "Now", updated_at: "Now" },
        { id: 2, name: 'Medium', created_at: "Now", updated_at: "Now"},
        { id: 3, name: 'Low', created_at: "Now", updated_at: "Now" }
    ]);
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="w-full justify-start">
                    {value ? (
                        <Badge 
                            variant={priorities.find((priority) => priority.id === value.id)?.name.toLowerCase() as 'high' | 'medium' | 'low'}
                            className="font-thin text-black"
                        >
                            {priorities.find((priority) => priority.id === value.id)?.name}
                        </Badge>
                    )
                    : '-'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-nav text-textcolor border-bordercolor p-0 w-auto">
                <Command>
                    <CommandGroup>
                        {priorities.map((value) => {
                            const handleSelect = () => {
                                onSelect(value)
                                setOpen(false);
                            }

                            return (
                                <CommandItem key={value.id} className="hover:bg-bgactive" onSelect={handleSelect}>
                                    <Badge variant={value.name.toLowerCase() as 'high'} className={`text-black font-thin`}>{value.name}</Badge>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}