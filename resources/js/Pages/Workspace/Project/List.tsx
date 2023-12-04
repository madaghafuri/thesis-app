import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Button } from "@/Components/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/Command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/Components/ContextMenu";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import PrimaryButton from "@/Components/PrimaryButton";
import { ListSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { ListSectionHeader } from "@/Components/Workspace/Project/Section/ListSectionHeader";
import { TaskRow } from "@/Components/Workspace/Project/Section/Task/TaskRow";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Section, Task, User } from "@/types";
import { cn } from "@/utils";
import { router, usePage } from "@inertiajs/react";
import { Plus, Trash, User as UserIcon, X } from "lucide-react";
import { useState } from "react";

type ListPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function List() {
    const { props } = usePage<PageProps<ProjectViewProps & ListPageProps>>();
    const [selectedUsers, setSelectedUser] = useState<User[]>([]);
    const [open, setOpen] = useState(false);

    const selectedUsersId = selectedUsers.map((val) => val.id);

    const filteredSections = selectedUsers.length > 0 ? props.sections.map((value) => {
        return {...value, tasks: value.tasks.filter((value) => {
            if (!value.user) return false;

            return selectedUsersId.includes(value.user.id);
        })}
    }): props.sections;

    console.log(props.sections);

    const handleCreateSection = () => {
        router.post(route('section.store', { project: props.data.project.id }))
    }

    return (
        <Authenticated user={props.auth.user} currentWorkspace={props.data.workspace} workspaces={props.workspaceList} projects={props.data.projectList} >
            <ProjectViewLayout>
                <div className="border-b-[1px] border-bordercolor py-2 px-4">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button className={cn(
                                "flex items-center gap-1 h-7 px-2 outline outline-1 outline-bordercolor text-textweak",
                                selectedUsers.length > 0 && "outline-blue text-blue"
                            )}>
                                <UserIcon className="h-5" />
                                Person
                                {selectedUsers.length > 0 ? <span>{selectedUsers.length}</span> : null}
                                {selectedUsers.length > 0 ? (
                                    <X className="h-3 rounded-md hover:bg-black" onClick={() => setSelectedUser([])} />
                                ): null}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 bg-dark-gray border-bordercolor">
                            <Command className="text-textcolor">
                                <CommandInput className="ring-0 border-none focus:ring-0 focus:border-none text-textcolor" placeholder="Search members..." />
                                <CommandEmpty>No members found</CommandEmpty>
                                <CommandGroup>
                                    {props.data.members.map((member) => {
                                        const handleMemberSelect = () => {
                                            setSelectedUser((prev) => [...prev, member]);
                                            setOpen(false);
                                        }

                                        return (
                                            <CommandItem key={member.id} onSelect={handleMemberSelect} className="flex items-center gap-2 text-textcolor hover:bg-bgactive">
                                                <Avatar>
                                                    <AvatarFallback className="bg-blue">{member.name[0].toUpperCase()}</AvatarFallback>
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
                <div className="text-textcolor px-4 py-2">
                    <ListSectionHeader />
                    {filteredSections.map((section) => {
                        const handleAddTask = () => {

                        }

                        return (
                            <ListSectionContainer key={section.id} section={section} onAddTask={handleAddTask}>
                                {section.tasks.map((task) => {
                                    const handleDeleteTask = () => {
                                        router.delete(route('task.destroy', { task: task.id }));
                                    }

                                    if (task.section_id === section.id)
                                    return (
                                        <ContextMenu key={task.id}>
                                            <ContextMenuTrigger>
                                                <TaskRow task={task} />
                                            </ContextMenuTrigger>
                                            <ContextMenuContent className="border-bordercolor text-textcolor bg-nav">
                                                <ContextMenuItem className="hover:bg-bgactive select-none text-danger" onClick={handleDeleteTask}>
                                                    <Trash className="h-3.5"/>
                                                    Delete
                                                </ContextMenuItem>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    )
                                })}
                            </ListSectionContainer>
                        )
                    })}
                    <PrimaryButton className="hover:bg-bgactive text-textweak ml-3 px-2" onClick={handleCreateSection}>
                        <Plus className="h-5" />
                        Add Section
                    </PrimaryButton>
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}