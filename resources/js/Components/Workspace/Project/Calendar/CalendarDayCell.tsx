import { PageProps, WorkloadUser } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { ProjectViewProps } from "../ProjectViewLayout";

type Props = {
    date: Date
}

export function CalendarDayCell({children, date}: PropsWithChildren<Props>) {
    const { props } = usePage<PageProps<ProjectViewProps & { users: WorkloadUser[] }>>()

    return (
        <div className="h-36 outline outline-bordercolor outline-1 p-2">
            <h2 className="text-right">{date.getDate()}</h2>
        </div>
    )
}