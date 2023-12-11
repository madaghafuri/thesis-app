import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Log, Task, User } from "@/types"
import { formatRelative } from "date-fns";

type LogItemProps = {
    taskLog: Log;
}

export function LogItem({ taskLog }: LogItemProps) {
    const relativeTime = formatRelative(new Date(taskLog.created_at), new Date());

    return (
        <div className="py-2 flex items-center gap-3">
            <Avatar style={{ backgroundColor: taskLog.user.color }} className="text-black">
                <AvatarFallback>{taskLog.user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p>{taskLog.user.name} {' '} {taskLog.event} {' '} {taskLog.task.name}</p>  
                <p className="text-xs font-thin text-white/60">{relativeTime}</p>
            </div>
        </div>
    )
}