import { Task, User } from "@/types"
import { differenceInDays, getDay } from "date-fns";
import { useTaskSize } from "./hooks";

type Props = {
    startDate?: Date;
    endDate?: Date;
    task: Task;
    eachDayInterval: Date[];
    dayWidth: number;
}

export function EventBlock({ startDate = new Date(), endDate = new Date(), task, dayWidth }: Props) {
    const { leftPos, rangeDurationWidth } = useTaskSize(startDate, endDate, dayWidth);

    console.log(task);

    return (
        <div
            className={`text-textcolor h-10 relative`}
        >
            <div
                className="bg-blue rounded-md absolute h-full flex items-center pl-2 hover:bg-blue/50 select-none"
                style={{ left: `${leftPos}%`, width: rangeDurationWidth }}
            >
                {task.name}
            </div>
        </div>
    )
}