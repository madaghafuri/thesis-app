import { Button } from "@/Components/Button";
import { ContextMenu, ContextMenuContent, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/Components/ContextMenu";
import { Separator } from "@/Components/Separator";
import { useToast } from "@/Components/Toast/useToast";
import { BoardSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { TaskCard } from "@/Components/Workspace/Project/Section/Task/TaskCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TaskTrackerContextProvider from "@/TaskTrackerProvider";
import { PageProps, Section, Task } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { format } from "date-fns";
import { ArrowRightLeft, Plus, Trash } from "lucide-react";

type BoardPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function Board() {
    const { props } = usePage<PageProps<ProjectViewProps & BoardPageProps>>();
    const { toast } = useToast();

    console.log(props.sections);

    const handleCreateSection = () => {
        router.post(route('section.store', { project: props.data.project.id }));
    }

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