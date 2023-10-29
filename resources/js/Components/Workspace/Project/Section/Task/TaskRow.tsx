import { Task } from "@/types"
import { Plus } from "lucide-react";

type TaskRowProps = {
    task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
    return (
        <div className="w-full flex items-center text-textcolor text-sm font-thin hover:bg-bgactive">
            <div className="w-[44rem] p-2 pl-10 border-y-[1px] border-r-[1px] border-bordercolor">{task.name}</div>
            <div className="w-40 p-2 border-y-[1px] border-r-[1px] border-bordercolor">Assignee</div>
            <div className="w-40 p-2 border-y-[1px] border-r-[1px] border-bordercolor">Due Date</div>
            <div className="w-40 p-2 border-y-[1px] border-r-[1px] border-bordercolor">Priority</div>
            <div className="grow p-2 border-y-[1px] border-bordercolor">
                <Plus className="h-5" />
            </div>
        </div>
    )
}