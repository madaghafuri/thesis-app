import { PageProps, Task, WorkloadUser } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import { ProjectViewProps } from "../ProjectViewLayout";
import {
    eachDayOfInterval,
    endOfMonth,
    isAfter,
    isBefore,
    startOfMonth,
} from "date-fns";
import { CalendarTaskItem } from "./CalendarTaskItem";

type Props = {
    date: Date;
    tasks: Task[];
};

export function CalendarDayCell({
    children,
    date,
    tasks,
}: PropsWithChildren<Props>) {
    const { props } =
        usePage<
            PageProps<
                ProjectViewProps & { users: WorkloadUser[]; tasks: Task[] }
            >
        >();
    const taskList = tasks.filter((task) => {
        if (
            task.start_date === null ||
            task.due_date === null ||
            isBefore(new Date(task.due_date), new Date(task.start_date)) ||
            isAfter(new Date(task.start_date), new Date(task.due_date))
        )
            return false;

        const dayRange = eachDayOfInterval({
            start: new Date(task.start_date),
            end: new Date(task.due_date),
        });
        const simplifiedDayRange = dayRange.map((val) => val.toDateString());

        return simplifiedDayRange.includes(date.toDateString());
    });

    return (
        <div className="outline outline-bordercolor outline-1 p-2 bg-content">
            <h2 className="text-right">{date.getDate()}</h2>
            <div className="flex flex-col overflow-y-visible overflow-x-hidden gap-2">
                {taskList.map((task) => {
                    return <CalendarTaskItem key={task.id} task={task} />;
                })}
            </div>
        </div>
    );
}
