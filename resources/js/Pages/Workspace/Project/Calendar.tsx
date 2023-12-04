import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Button } from "@/Components/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { CalendarView } from "@/Components/Workspace/Project/Calendar/CalendarView";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Task, WorkloadUser } from "@/types";
import { usePage } from "@inertiajs/react";
import { addMonths, format, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Filter, User } from "lucide-react";
import { useState } from "react";

export default function Calendar() {
    const { props } = usePage<PageProps<ProjectViewProps & { users: WorkloadUser[], tasks: Task[] }>>();
    const [date, setDate] = useState<Date>(new Date);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<WorkloadUser[]>([]);
    const filteredUsersId = users.map((val) => val.id);

    const filteredTasks = users.length > 0 ? props.tasks.filter((val) => {
        if (!val.user) return false;

        return filteredUsersId.includes(val.user.id)
    }): props.tasks;

    console.log({users, filteredTasks});

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <div className="flex items-center p-3">
                    <div className="grid grid-cols-2 gap-2 items-center mr-2">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                                    <User className="h-4" />
                                    Person
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-nav text-textweak p-0 border-bordercolor">
                                <Command>
                                    <CommandInput className="ring-0 border-none focus:ring-0 focus:border-none " placeholder="Search members..." />
                                    <CommandEmpty>No members found</CommandEmpty>
                                    <CommandGroup>
                                        <div className="flex items-center justify-center">
                                            <p className="text-textweak text-sm">Select one people</p>
                                        </div>
                                        {props.users.map((member) => {
                                            const handleSelect = () => {
                                                setUsers((prev) => [...prev, member]);
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
                                                        <AvatarFallback className="bg-blue text-textcolor" >{member.name[0].toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    {member.name}
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                            <Filter className="h-4" />
                            Filter
                        </Button>
                    </div>
                    <span> | </span>
                    <div className="flex gap-2 ml-2 items-center">
                        <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline" onClick={() => {
                            setDate(new Date(Date.now()))
                        }}>
                            Today
                        </Button>
                        <div className="flex items-center justify-center text-textweak">
                            <Button className="h-8 px-1 hover:bg-bgactive rounded-full" variant="outline" onClick={() => setDate(prev => subMonths(prev, 1))}>
                                <ChevronLeft className="h-4" />
                            </Button>
                            <Button className="h-8 px-1 hover:bg-bgactive rounded-full" variant="outline" onClick={() => setDate(prev => addMonths(prev, 1))}>
                                <ChevronRight className="h-4" />
                            </Button>
                        </div>
                        <div>{format(date, "MMMM")}{' '}{format(date, "yyyy")}</div>
                    </div>
                </div>
                <CalendarView date={date} tasks={filteredTasks} />
            </ProjectViewLayout>
        </Authenticated>
    )
}