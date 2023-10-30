import { useDialog } from "@/Components/Dialog";
import PrimaryButton from "@/Components/PrimaryButton";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/Sheet";
import { ProjectSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { CreateSectionForm } from "@/Components/Workspace/Project/Section/CreateSectionForm";
import { ListSectionHeader } from "@/Components/Workspace/Project/Section/ListSectionHeader";
import { TaskRow } from "@/Components/Workspace/Project/Section/Task/TaskRow";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Section, Task } from "@/types";
import { usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";

type ListPageProps = {
    sections: Section[];
}

export default function List() {
    const { props } = usePage<PageProps<ProjectViewProps & ListPageProps>>();
    const { showDialog } = useDialog();

    console.log(props);

    const handleCreateSection = () => {
        showDialog(<CreateSectionForm project={props.data.project} />, 'Create Section');

        // setSections((prev) => {
        //     const newSections = [...prev];
        //     newSections.push({
        //         id: 2,
        //         name: "More",
        //         created_at: "Now",
        //         updated_at: 'Then',
        //         tasks: []
        //     });
        //     return newSections;
        // })
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
                            <ProjectSectionContainer key={section.id} section={section} onAddTask={handleAddTask}>
                                {/* {section.tasks.map((task) => {
                                    return (
                                        <TaskRow key={task.id} task={task} />
                                    )
                                })} */}
                            </ProjectSectionContainer>
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