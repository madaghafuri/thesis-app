import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Badge } from "@/Components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Card";
import { Sheet, SheetTrigger } from "@/Components/Sheet";
import { format, isAfter } from "date-fns";
import { TaskSheet } from "./TaskSheet";
import { PageProps, Task } from "@/types";
import { Fragment } from "react";
import { cn } from "@/utils";
import { usePage } from "@inertiajs/react";

export function TaskCard({ task }: { task: Task }) {
    const pastDueDate = isAfter(new Date(), new Date(task.due_date));
    const { props } = usePage<PageProps>();

    return (
        <Fragment>
            <Sheet>
                <SheetTrigger className="w-full">
                    <Card className="border-bordercolor bg-black text-textcolor hover:bg-black/70">
                        <CardHeader className="p-4">
                            <CardTitle className="text-left truncate text-lg">
                                {task.name || ""}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center gap-3 p-4 pt-0">
                            {task.priority ? (
                                <Badge
                                    className="text-black w-fit"
                                    variant={
                                        task.priority.name.toLowerCase() as
                                            | "high"
                                            | "medium"
                                            | "low"
                                    }
                                >
                                    {task.priority.name}
                                </Badge>
                            ) : null}
                            <div className="flex items-center gap-3">
                                {task.user ? (
                                    <Avatar>
                                        <AvatarFallback
                                            style={{
                                                backgroundColor:
                                                    task.user.color,
                                            }}
                                            className="text-black"
                                        >
                                            {task.user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Avatar>
                                        <AvatarFallback className="-z-40">
                                            H
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                {task.priority ? (
                                    <span
                                        className={cn(
                                            "text-sm",
                                            pastDueDate
                                                ? "text-danger"
                                                : "text-textweak"
                                        )}
                                    >
                                        {task.due_date
                                            ? format(
                                                  new Date(task.due_date),
                                                  "PP"
                                              )
                                            : ""}
                                    </span>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </SheetTrigger>
                <TaskSheet task={task} />
            </Sheet>
        </Fragment>
    );
}
