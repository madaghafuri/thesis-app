import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Badge } from "@/Components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Card";
import { Sheet, SheetTrigger } from "@/Components/Sheet";
import { formatDistanceToNow } from "date-fns";
import { TaskSheet } from "./TaskSheet";
import { Task } from "@/types";

export function TaskCard({ task, }: { task: Task }) {
    const currentTaskDate = new Date(task.due_date);

    return (
        <Sheet>
            <SheetTrigger className="w-full">
                <Card className="border-bordercolor bg-black text-textcolor hover:bg-black/70">
                    <CardHeader className="p-4">
                        <CardTitle className="text-left truncate text-lg">{task.name || "Lorem ipsum dolor lamet lkjasdlkji alkjdai asldkaji alkdjalkjd"}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center gap-3 p-4 pt-0">
                        {task.priority ? <Badge className="text-black w-fit" variant={task.priority.name.toLowerCase() as 'high' | 'medium' | 'low'} >{task.priority.name}</Badge>
                        : null}
                        <div className="flex items-center gap-3">
                            {task.user ? (
                                <Avatar>
                                    <AvatarFallback className="bg-blue">{task.user.name[0]}</AvatarFallback>
                                </Avatar>
                            )
                            : (
                                <Avatar>
                                    <AvatarFallback className="-z-40">H</AvatarFallback>
                                </Avatar>
                            )}
                            {task.priority ? (
                                <span className="text-textweak text-sm">{task.due_date ? formatDistanceToNow(currentTaskDate) : ''}</span>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <TaskSheet task={task} />
        </Sheet>
    )
}