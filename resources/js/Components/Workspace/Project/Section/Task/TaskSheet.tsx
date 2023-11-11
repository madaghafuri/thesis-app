import { Button } from "@/Components/Button";
import { SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/Components/Sheet";
import { ChevronDown, Play, StopCircle, Trash, Trash2, UserCircle2 } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import InputLabel from "@/Components/InputLabel";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { router, useForm, usePage } from "@inertiajs/react";
import { PageProps, Priority, Task, User } from "@/types";
import { ProjectViewProps } from "../../ProjectViewLayout";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from "@/Components/Calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/Select";
import { Textarea } from "@/Components/TextArea";
import { SelectSingleEventHandler } from "react-day-picker";
import { format, formatISO } from "date-fns";
import { FormEvent, useState } from "react";
import { Badge } from "@/Components/Badge";
import { useTrackTime } from "@/hooks/useTimeTrack";
import { secondsToHours } from "@/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/Accordion";

export function TaskSheet({task}: { task: Task }) {
    const { data: taskData, setData, processing, patch, errors } = useForm<Task>(task);
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [openAssigneeOptions, setOpenAssigneeOptions] = useState(false);
    const [date, setDate] = useState<Date>();
    const { isCounting, elapsedTime, startTimer, stopTimer } = useTrackTime();
    
    const currentTaskDate = new Date(taskData.due_date);

    const accumulatedTime = task.times.reduce((time, curr) => {
        return time += curr.duration
    }, 0)

    const priorities: Priority[] = [
        { id: -1, name: '-', created_at: "Never", updated_at: "Never" },
        ...props.data.priorities
    ]

    const members: User[] = [
        { id: -1, email: "-", name: "-", email_verified_at: "-" },
        ...props.data.members
    ]

    const handleSaveChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        patch(route('task.update', { task: taskData.id }));
    }

    const handleSelectDueDate = (val: Date) => {
        setDate(val);
        setData('due_date', formatISO(val));
    }

    const startTimeTracking = () => {
        router.post(route('time.start', { task: task.id }), {}, {
            onSuccess: () => {
                startTimer();
            }
        })
    }

    const stopTimeTracking = () => {
        router.post(route('time.stop', { task: task.id }), { duration: elapsedTime }, {
            onSuccess: () => {
                stopTimer()
            }
        });
    }

    return (
        <SheetContent className="bg-content text-textcolor border-bordercolor min-w-[40rem]">
            <SheetHeader className="grid grid-cols-3 items-center">
                <Button className="w-fit text-danger gap-2 items-center border-[1px] border-danger hover:bg-danger hover:text-textcolor">
                    <Trash />
                    Delete
                </Button>
                <div className="rounded-md border-bordercolor border-[1px] flex justify-center items-center w-fit gap-0 pl-2">
                    {isCounting ? (
                        <Button className="hover:bg-bgactive text-textcolor bg-danger h-6 px-0" onClick={stopTimeTracking}>
                            <StopCircle className="h-4" />
                        </Button>
                    ): (
                        <Button className="hover:bg-bgactive text-textcolor hover:text-textcolor bg-indigo h-6 px-0" onClick={startTimeTracking}>
                            <Play className="h-4" />
                        </Button>
                    )}
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex items-center justify-between w-24 font-thin text-sm p-2 pr-0">
                                {secondsToHours(elapsedTime)}
                                <ChevronDown className="h-4" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="bg-black drop-shadow-2xl border-bordercolor text-textcolor w-[20rem]">
                            <h2 className="text-textcolor text-center">Time Tracker</h2>
                            {task.times.length > 0 ? (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="acc-time">
                                        <AccordionTrigger>
                                            <div className="grid grid-cols-2 items-center text-sm mt-3">
                                                {task.user ? (
                                                    <Avatar className="bg-yellow text-black">
                                                        <AvatarFallback>M</AvatarFallback>
                                                    </Avatar>
                                                ): (
                                                    <UserCircle2 className="text-textweak stroke-1" />
                                                )}
                                                {task.user ? (
                                                    <p className="text-right">{secondsToHours(accumulatedTime)}</p>
                                                ): null}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {task.times.map((time) => {
                                                const trackedDate = new Date(time.created_at);
                                                const timeTrackedDate = format(trackedDate, "PP").split(',')[0];

                                                const handleDeleteTimeTrack = () => {
                                                    router.delete(route('time.destroy', { timeTracker: time.id }));
                                                }

                                                return (
                                                    <div className="bg-bgactive select-none grid grid-cols-3 items-center text-textweak p-2 border-[1px] border-black" key={time.id}>
                                                        <span className="text-sm font-thin">{timeTrackedDate}</span>
                                                        <span className="text-sm font-thin text-textcolor">{secondsToHours(time.duration)}</span>
                                                        <Button className="place-self-end self-center h-4 px-0" onClick={handleDeleteTimeTrack}>
                                                            <Trash2 className="h-4 text-danger" />
                                                        </Button>
                                                    </div>
                                                )
                                            })}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ): null}
                        </PopoverContent>    
                    </Popover>
                </div>
            </SheetHeader>
            <div>
                <form className="flex flex-col gap-2" onSubmit={handleSaveChange}>
                    <div className="mt-4 w-full">
                        <SectionTitle className="min-w-full" placeholder="Write a Task name" isFocused={false} value={taskData.name} onChange={e => setData('name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Assignee" />

                        <Popover open={openAssigneeOptions} onOpenChange={setOpenAssigneeOptions}>
                            <PopoverTrigger>
                                {taskData.user ? (
                                    <div className="flex items-center gap-2 rounded-md hover:bg-bgactive p-2 w-fit">
                                        <Avatar>
                                            <AvatarFallback className="bg-yellow text-black">{taskData.user.name[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {taskData.user.name}
                                    </div>
                                ) : (
                                    <div className="flex p-2 items-center rounded-md justify-start text-textweak hover:bg-bgactive w-fit gap-2 tracking-tight">
                                        <UserCircle2 className="h-4" />
                                        <h4 className="font-thin text-sm hover:text-textcolor" >No Assignee</h4>
                                    </div>
                                )}
                            </PopoverTrigger>
                            <PopoverContent className="bg-black border-bordercolor p-0">
                                <Command className="text-textweak">
                                    <CommandInput placeholder="Search members..." className="focus:ring-0 focus:border-none" />
                                    <CommandEmpty>No member found.</CommandEmpty>
                                    <CommandGroup heading="Member">
                                        {members.map((member) => {
                                            const handleSelectAssignee = () => {
                                                setData('user', member);
                                                setOpenAssigneeOptions(false);
                                            }
                                            
                                            return (
                                                <CommandItem
                                                    key={member.id}
                                                    value={member.name}
                                                    className="text-textcolor gap-2 hover:bg-bgactive"
                                                    onSelect={handleSelectAssignee}
                                                >
                                                    <Avatar>
                                                        <AvatarFallback className="bg-yellow text-black">{member.name[0].toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    {member.name}
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Due Date" />
                        
                        <Popover>
                            <PopoverTrigger>
                                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-bgactive text-textweak w-auto">
                                    <CalendarIcon className="h-4" />
                                    <h4 className="font-thin text-sm hover:text-textcolor">{taskData.due_date ? format(currentTaskDate, "PPP") : <span>No Due Date</span>}</h4>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-nav w-auto text-textweak p-0 border-bordercolor">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleSelectDueDate as SelectSingleEventHandler}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Priority" />
                        
                        <Select onValueChange={(value) => {
                            const priority = priorities.find(priority => priority.name === value) as Priority;
                            setData('priority', priority);
                        }}>
                            <SelectTrigger className="border-bordercolor">
                                <SelectValue className="text-textweak" placeholder={taskData.priority ? <Badge variant={taskData.priority.name.toLowerCase() as 'high'}>{taskData.priority.name}</Badge> : "-"} />
                            </SelectTrigger>
                            <SelectContent className="bg-nav text-textcolor border-bordercolor">
                                <SelectGroup>
                                    {priorities.map((value) => {
                                        const handlePrioritySelect = () => {
                                            setData('priority', value);
                                        }

                                        if (value.id < 0) {
                                            return <SelectItem key={value.id} value={value.name} className="hover:bg-bgactive" >
                                                {value.name}
                                            </SelectItem>
                                        }

                                        return (
                                            <SelectItem onSelect={handlePrioritySelect} className="hover:bg-bgactive" key={value.id} value={value.name} >
                                                <Badge className="text-black" variant={value.name.toLowerCase() as 'high' | 'medium' | 'low'} >{value.name}</Badge>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Textarea className="bg-black min-h-[10rem]" placeholder="What is this taskData about?" />
                    <SheetFooter className="mt-4">
                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue">Save Changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </div>
        </SheetContent>
    )
}