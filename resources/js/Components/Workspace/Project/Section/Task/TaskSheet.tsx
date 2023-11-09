import { Button } from "@/Components/Button";
import { SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/Components/Sheet";
import { Trash, UserCircle2 } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import InputLabel from "@/Components/InputLabel";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { useForm, usePage } from "@inertiajs/react";
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

export function TaskSheet({task}: { task: Task }) {
    const { data: taskData, setData, processing, patch, errors } = useForm<Task>(task);
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [openAssigneeOptions, setOpenAssigneeOptions] = useState(false);
    const [date, setDate] = useState<Date>();
    
    const currentTaskDate = new Date(taskData.due_date);

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

    return (
        <SheetContent className="bg-black text-textcolor border-bordercolor min-w-[40rem]">
            <SheetHeader>
                <Button className="w-fit text-danger gap-2 items-center border-[1px] border-danger hover:bg-danger hover:text-textcolor">
                    <Trash />
                    Delete
                </Button>
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