import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Button } from "@/Components/Button";
import { Progress } from "@/Components/Progress";
import {
    ProjectViewLayout,
    ProjectViewProps,
} from "@/Components/Workspace/Project/ProjectViewLayout";
import { EventBlock } from "@/Components/Workspace/Project/Workload/EventBlock";
import {
    getAccumulatedHoursByUser,
    useDayCellWidth,
} from "@/Components/Workspace/Project/Workload/hooks";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, WorkloadUser } from "@/types";
import { usePage } from "@inertiajs/react";
import {
    addDays,
    eachDayOfInterval,
    endOfWeek,
    format,
    getWeek,
    startOfWeek,
    subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Gantt, Task as GanttTask } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function Workload() {
    const { props } =
        usePage<PageProps<ProjectViewProps & { users: WorkloadUser[] }>>();
    const [date, setDate] = useState(new Date());
    const week = getWeek(date);
    const startDay = startOfWeek(date);
    const endDay = endOfWeek(date);
    const eachDayInterval = eachDayOfInterval({ start: startDay, end: endDay });
    const { dayRef, dayWidth } = useDayCellWidth();
    const dateRangeISO = eachDayInterval.map((val) => val.toLocaleDateString());

    // const ganttTasks: GanttTask[] = props.users.map((member) => {
    //     return member.tasks.flatMap((task) => ({
    //         start: new Date(task.start_date),
    //         end: new Date(task.due_date),
    //         name: task.name,
    //         id: task.id,
    //         type: "task",
    //         progress: 70,
    //         isDisabled: true,
    //     }));
    // });

    const ganttTasks: GanttTask[] = [];

    props.users.forEach((member) => {
        member.tasks.forEach((task) => {
            ganttTasks.push({
                start: new Date(task.start_date),
                end: new Date(task.due_date),
                name: task.name,
                id: task.id.toString(),
                type: "task",
                progress: 70,
                isDisabled: true,
            });
        });
    });

    return (
        <Authenticated
            user={props.auth.user}
            currentWorkspace={props.data.workspace}
            projects={props.data.projectList}
            workspaces={props.workspaceList}
        >
            <ProjectViewLayout>
                <div className="flex">
                    <div className="text-textcolor w-1/6 px-4 py-2">
                        <h1 className="text-lg font-bold">Assignee</h1>
                    </div>
                    <div className="text-textcolor grow">
                        <div className="px-4 py-2 text-lg">
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold">
                                    {format(date, "MMMM")}
                                </h1>
                                <h1 className="font-bold">
                                    Week {week.toString()}
                                </h1>
                                <div className="flex items-center gap-1">
                                    <Button
                                        className="bg-black hover:bg-bgactive px-1 h-8"
                                        onClick={() =>
                                            setDate((prev) => subDays(prev, 7))
                                        }
                                    >
                                        <ChevronLeft className="h-4" />
                                    </Button>
                                    <Button
                                        className="bg-black hover:bg-bgactive px-1 h-8"
                                        onClick={() =>
                                            setDate((prev) => addDays(prev, 7))
                                        }
                                    >
                                        <ChevronRight className="h-4" />
                                    </Button>
                                </div>
                            </div>
                            <span className="font-thin text-sm text-textweak">
                                {format(startDay, "PP").split(",")[0] +
                                    " - " +
                                    format(endDay, "PP").split(",")[0]}
                            </span>
                        </div>
                        <div className="grid grid-cols-7 px-4">
                            {eachDayInterval.map((value, index) => {
                                return (
                                    <div
                                        key={`${index}-${value.toLocaleString()}`}
                                        ref={dayRef}
                                        className="select-none text-sm text-textweak"
                                    >
                                        {format(value, "EEE")}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <Gantt tasks={ganttTasks} />
                </div>
                {/* {props.users.map((member) => {
                    const taskByWeek = member.tasks.filter((task) => {
                        const startDate = new Date(
                            task.created_at
                        ).toLocaleDateString();
                        const endDate = new Date(
                            task.due_date
                        ).toLocaleDateString();

                        return (
                            dateRangeISO.includes(startDate) ||
                            dateRangeISO.includes(endDate)
                        );
                    });

                    const accumulatedWorkHours = getAccumulatedHoursByUser(
                        member,
                        date
                    );
                    const percentage =
                        Math.abs(accumulatedWorkHours / 40) * 100 > 100
                            ? 100
                            : Math.abs(accumulatedWorkHours / 40) * 100;

                    return (
                        <div
                            key={member.id}
                            className="flex items-center border-bordercolor border-[1px] h-full "
                        >
                            <div className="w-1/6 h- px-4 py-2 text-textcolor">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        style={{
                                            backgroundColor: member.color,
                                        }}
                                        className="text-black"
                                    >
                                        <AvatarFallback>
                                            {member.name[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                </div>
                                <span className="text-textweak text-sm font-thin">
                                    {accumulatedWorkHours}h/40h
                                </span>
                                <Progress value={percentage} className="mt-2" />
                            </div>
                            <div className="grid px-4 grow py-2 gap-3">
                                {taskByWeek.map((task, index) => {
                                    const startDate = new Date(task.created_at);
                                    const endDate = new Date(task.due_date);

                                    return (
                                        <EventBlock
                                            key={`${index}-${task.name}-${task.id}`}
                                            startDate={startDate}
                                            endDate={endDate}
                                            task={task}
                                            eachDayInterval={eachDayInterval}
                                            dayWidth={dayWidth}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })} */}
            </ProjectViewLayout>
        </Authenticated>
    );
}
