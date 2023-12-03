import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/Components/ContextMenu";
import { useModal } from "@/Components/Dialog";
import PrimaryButton from "@/Components/PrimaryButton";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/Sheet";
import { ListSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { CreateSectionForm } from "@/Components/Workspace/Project/Section/CreateSectionForm";
import { ListSectionHeader } from "@/Components/Workspace/Project/Section/ListSectionHeader";
import { TaskRow } from "@/Components/Workspace/Project/Section/Task/TaskRow";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Section, Task } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Plus, Trash } from "lucide-react";
import { ChangeEvent, useState } from "react";

type ListPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function List() {
    const { props } = usePage<PageProps<ProjectViewProps & ListPageProps>>();
    const { showModal } = useModal();

    const handleCreateSection = () => {
        router.post(route('section.store', { project: props.data.project.id }))
    }

    return (
        <Authenticated user={props.auth.user} currentWorkspace={props.data.workspace} workspaces={props.workspaceList} projects={props.data.projectList} >
            <ProjectViewLayout>
                <div className="text-textcolor px-4 py-2">
                    <ListSectionHeader />
                    {props.sections.map((section) => {
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