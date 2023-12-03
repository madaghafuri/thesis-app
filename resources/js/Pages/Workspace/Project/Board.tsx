import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Button } from "@/Components/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { ContextMenu, ContextMenuContent, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/Components/ContextMenu";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Separator } from "@/Components/Separator";
import { useToast } from "@/Components/Toast/useToast";
import { BoardSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { TaskCard } from "@/Components/Workspace/Project/Section/Task/TaskCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TaskTrackerContextProvider from "@/TaskTrackerProvider";
import { PageProps, Section, Task, User } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { format } from "date-fns";
import { ArrowRightLeft, Plus, Trash, User as UserIcon } from "lucide-react";
import { useState } from "react";

type BoardPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function Board() {
    const { props } = usePage<PageProps<ProjectViewProps & BoardPageProps>>();
    const { toast } = useToast();
    const [selectedUser, setSelectedUser] = useState<User[]>([]);
    const [openAssigneeFilter, setOpenAssigneeFilter] = useState(false);

    const handleCreateSection = () => {
        router.post(route('section.store', { project: props.data.project.id }));
    }

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <div className="flex items-center p-3 border-b-[1px] border-bordercolor bg-dark-gray">
                    <Popover open={openAssigneeFilter} onOpenChange={setOpenAssigneeFilter}>
                        <PopoverTrigger asChild>
                            <Button className="h-7 px-2 hover:bg-bgactive outline outline-1 outline-bordercolor">
                                <UserIcon className="h-5" />
                                Person
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 bg-dark-gray border-bordercolor">
                            <Command className="text-textcolor">
                                <CommandInput className="ring-0 border-none focus:ring-0 focus:border-none" placeholder="Search members..." />
                                <CommandEmpty>No Members found</CommandEmpty>
                                <CommandGroup>
                                    {props.data.members.map((member) => {
                                        const handleAssigneeSelect = () => {
                                            setOpenAssigneeFilter(false);
                                        }

                                        return (
                                            <CommandItem key={member.id} className="gap-2 hover:bg-bgactive" onSelect={handleAssigneeSelect}>
                                                <Avatar>
                                                    <AvatarFallback className="bg-blue text-white">{member.name[0].toUpperCase()}</AvatarFallback>
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
                <div className="text-textcolor px-4 py-2 flex gap-1">
                    {props.sections.map((section) => {
                        const handleAddTask = () => {
                            router.post(route('task.store', { project: props.data.project.id, section: section.id }))
                        }

                        return (
                            <BoardSectionContainer key={section.id} section={section} onAddTask={handleAddTask}>
                                {section.tasks.map((task) => {
                                    const handleDeleteTask = () => {
                                        router.delete(route('task.destroy', { task: task.id }), {
                                            onSuccess: () => {
                                                toast({
                                                    title: `${task.name} has been deleted.`,
                                                    description: format(new Date(), "PPP"),
                                                    variant: "destructive"
                                                });
                                            }
                                        });
                                    }

                                    return (
                                        <ContextMenu key={task.id}>
                                            <ContextMenuTrigger>
                                                {/* <TaskTrackerContextProvider> */}
                                                    <TaskCard task={task} />
                                                {/* </TaskTrackerContextProvider> */}
                                            </ContextMenuTrigger>
                                            <ContextMenuContent className="bg-black border-bordercolor w-[10rem]">
                                                <ContextMenuSub>
                                                    <ContextMenuSubTrigger className="text-textcolor text-sm hover:bg-bgactive p-1 flex items-center gap-2 select-none rounded" >
                                                        <ArrowRightLeft className="text-textweak h-4" />
                                                        Move To
                                                    </ContextMenuSubTrigger>
                                                    <ContextMenuSubContent className="bg-black border-bordercolor text-textcolor">
                                                        {props.sections.map((section) => {
                                                            const handleMoveSection = () => {
                                                                router.patch(route('task.update', { task: task.id }), { ...task as any, section_id: section.id  })
                                                            }

                                                            return (
                                                                <ContextMenuItem key={section.id} className="p-1 select-none text-sm rounded hover:bg-bgactive" onClick={handleMoveSection}>{section.name}</ContextMenuItem>
                                                            )
                                                        })}
                                                    </ContextMenuSubContent>
                                                </ContextMenuSub>
                                                <Separator />
                                                <ContextMenuItem className="text-danger text-sm hover:bg-bgactive p-1 flex items-center gap-2 select-none rounded" onClick={handleDeleteTask}>
                                                    <Trash className="h-4" />
                                                    Delete
                                                </ContextMenuItem>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    )
                                })}
                            </BoardSectionContainer>
                        )
                    })}
                    <div className="p-1">
                        <Button className="hover:bg-bgactive text-base font-bold text-textweak hover:text-textcolor gap-2" onClick={handleCreateSection}>
                            <Plus className="h-5" />
                            Add Section
                        </Button>
                    </div>
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}