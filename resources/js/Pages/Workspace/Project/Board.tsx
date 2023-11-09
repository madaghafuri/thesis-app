import { BoardSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { TaskCard } from "@/Components/Workspace/Project/Section/Task/TaskCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Section, Task } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

type BoardPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function Board() {
    const { props } = usePage<PageProps<ProjectViewProps & BoardPageProps>>();
    const [tasks, setTasks] = useState(props.tasks);

    console.log(props.sections);

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <div className="text-textcolor px-4 py-2 flex gap-1">
                    {props.sections.map((section) => {
                        const handleAddTask = () => {
                            router.post(route('task.store', { project: props.data.project.id, section: section.id }))
                        }

                        return (
                            <BoardSectionContainer key={section.id} section={section} onAddTask={handleAddTask}>
                                {section.tasks.map((task) => {
                                    if (task.section_id === section.id) return (
                                        <TaskCard key={task.id} task={task} />
                                    )
                                })}
                            </BoardSectionContainer>
                        )
                    })}
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}