import { PageProps, Priority, Task, User } from "@/types";
import { Badge } from "../Badge";
import { cn } from "@/utils";
import { format, isAfter } from "date-fns";
import { useModal } from "../Dialog";
import { TaskView } from "./TaskView";
import { usePage } from "@inertiajs/react";
import { Dialog, DialogContent, DialogTrigger } from "../BDialog";

export function MyTaskItem({ task }: { task: Task }) {
    const { showModal } = useModal();
    const { props } = usePage<PageProps<{ members: User[]; priorities: Priority[] }>>();

    const handleTaskClick = () => {
        showModal(<TaskView task={task} members={props.members} priorities={props.priorities} />, "Hello World");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="border-t-[1px] last-of-type:border-b-[1px] border-bordercolor grid grid-cols-[50%,4fr,1fr] items-center gap-4 py-2 cursor-pointer">
                    <p>{task.name}</p>
                    <div className="flex items-center justify-end">
                        <Badge className="truncate bg-neptune text-black font-thin">{task.project.name}</Badge>
                    </div>
                    <p className={cn(
                        "text-sm w-fit",
                        isAfter(new Date(), new Date(task.due_date)) ? "text-danger" : "text-white"
                    )}>{format(new Date(task.due_date), "PP").split(",")[0]}</p>
                </div>
            </DialogTrigger>
            <TaskView task={task} members={props.members} priorities={props.priorities} />
        </Dialog>
    )
}