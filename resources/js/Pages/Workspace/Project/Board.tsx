import { BoardSectionContainer } from "@/Components/Workspace/Project/ProjectSectionContainer";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { TaskCard } from "@/Components/Workspace/Project/Section/Task/TaskCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Section, Task } from "@/types";
import { cn } from "@/utils";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

type BoardPageProps = {
    sections: Section[];
    tasks: Task[];
}

export default function Board() {
    const { props } = usePage<PageProps<ProjectViewProps & BoardPageProps>>();
    const [sections, setSections] = useState(props.sections);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setSections(props.sections);
    }, [props]);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        /**
         * containerId
        */
        const sectionToDropId = over?.data.current?.sortable.containerId;
        const sectionFromDropId = active.data.current?.sortable.containerId;
        
        if (active.id !== over?.id) {
            if (sectionFromDropId === sectionToDropId) {
                /**
                 * Only happens when sorting
                 */
                setSections((sections) => {
                    const newSections = [...sections];
                    const tempTasks = newSections.find(value => value.id === parseInt(sectionFromDropId))?.tasks as Task[];
                    
                    const oldIndex = tempTasks.findIndex((value) => value.id === over?.id);
                    const newIndex = tempTasks.findIndex((value) => value.id === active.id);
                    
                    const newTasks = arrayMove(tempTasks, oldIndex, newIndex);
                    const sectionIndex = newSections.findIndex((value) => value.id === parseInt(sectionFromDropId));
                    newSections[sectionIndex].tasks = newTasks;
                    
                    return newSections;
                })
            }
        }
        setActiveId(null);
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        // console.log({active, over});
    }

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id);
    }

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <DndContext id="project-board" sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
                    <div className="text-textcolor px-4 py-2 flex gap-3">
                        {sections.map((section) => {
                            const handleAddTask = () => {
                                router.post(route('task.store', { project: props.data.project.id, section: section.id }))
                            }
                            const activeIndex = !!activeId ? section.tasks.findIndex((value) => value.id === activeId) : -1;

                            return (
                                <SortableContext key={section.id} id={section.id.toString()} items={section.tasks} strategy={verticalListSortingStrategy}>
                                    <BoardSectionContainer section={section} onAddTask={handleAddTask}>
                                        {section.tasks.map((task) => {
                                            return (
                                                <TaskCard key={task.id} className={cn(task.id === activeId && "opacity-40")} task={task} />
                                            ) 
                                        })}
                                    </BoardSectionContainer>
                                    {/* <DragOverlay dropAnimation={null} adjustScale={false}>
                                        {!!activeId ? (
                                            <TaskCard className="w-[19rem]" task={!!activeId ? section.tasks.find((value) => value.id === activeId): null} />
                                        ): null}
                                    </DragOverlay> */}
                                </SortableContext>
                            )
                        })}
                    </div>
                </DndContext>
            </ProjectViewLayout>
        </Authenticated>
    )
}