import { Sheet, SheetTrigger } from "@/Components/Sheet";
import { Fragment } from "react";
import { TaskSheet } from "../Section/Task/TaskSheet";
import { Task } from "@/types";

export function CalendarTaskItem({task}: { task: Task }) {
    return (
        <Fragment>
            <Sheet>
                <SheetTrigger>
                    <div style={{ backgroundColor: task.user?.color || '#74bfbb' }} className="rounded-md p-2 text-black text-xs font-thin hover:bg-neptune/30 text-left">
                        {task.name}
                    </div>
                </SheetTrigger>
                <TaskSheet task={task} />
            </Sheet>
        </Fragment>
    )
}