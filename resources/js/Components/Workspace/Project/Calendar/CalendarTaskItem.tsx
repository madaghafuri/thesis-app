import { Sheet, SheetTrigger } from "@/Components/Sheet";
import { Fragment } from "react";
import { TaskSheet } from "../Section/Task/TaskSheet";
import { Task } from "@/types";

export function CalendarTaskItem({task}: { task: Task }) {
    return (
        <Fragment>
            <Sheet>
                <SheetTrigger>
                    <div className="rounded-md p-2 bg-neptune text-black text-sm font-thin hover:bg-neptune/30 text-left">
                        {task.name}
                    </div>
                </SheetTrigger>
                <TaskSheet task={task} />
            </Sheet>
        </Fragment>
    )
}