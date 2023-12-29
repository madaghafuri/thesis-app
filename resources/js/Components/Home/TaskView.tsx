import { Priority, Task, User } from "@/types";
import { SectionTitle } from "../Workspace/Project/Section/SectionTitle";
import InputLabel from "../InputLabel";
import { SelectAssignee } from "../SelectAssignee";
import { router, useForm } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import { SelectPriority } from "../SelectPriority";
import { Calendar } from "../Calendar";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { format, formatISO, isAfter } from "date-fns";
import { Textarea } from "../TextArea";
import { cn } from "@/utils";
import { FileInput } from "../Workspace/Project/Section/Task/FileInput";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { FileComp } from "../Workspace/Project/Section/Task/TaskSheet";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "../BDialog";
import { SelectSingleEventHandler } from "react-day-picker";
import { TaskTracker } from "../Workspace/Project/Section/Task/TaskTracker";

export function TaskView({
    task,
    members,
    priorities,
}: {
    task: Task;
    members: User[];
    priorities: Priority[];
}) {
    const { data: taskData, setData, patch } = useForm(task);
    const pastDueDate = isAfter(new Date(), new Date(task.due_date));
    const [files, setFiles] = useState<File[]>([]);
    const [date, setDate] = useState<{ start_date: Date; due_date: Date }>({
        start_date: new Date(task.start_date),
        due_date: new Date(task.due_date),
    });
    const [completed, setCompleted] = useState(task.completed);

    const handleMarkComplete = () => {
        setCompleted((prev) => {
            const newState = !prev;
            const formData = { ...task, completed: newState };
            router.patch(route("task.update", { task: task.id }), formData, {
                onError: (e) => {
                    console.error(e);
                },
            });
            return newState;
        });
    };

    const handleSelectAssignee = (member: User) => {
        setData("user", member);
    };

    const handleSelectPriority = (value: Priority) => {
        setData("priority", value);
    };

    const handleSelectStartDate: SelectSingleEventHandler = (
        day: Date | undefined
    ) => {
        if (!day) return;
        setDate((prev) => {
            const newDate = { ...prev };
            newDate.start_date = day;
            return newDate;
        });
        setData("start_date", formatISO(day));
    };

    const handleSelectDueDate: SelectSingleEventHandler = (
        day: Date | undefined
    ) => {
        if (!day) return;
        setDate((prev) => {
            const newDate = { ...prev };
            newDate.due_date = day;
            return newDate;
        });
        setData("due_date", formatISO(day));
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const tempFiles = Array.from(e.target.files);
            setFiles([...files, ...tempFiles]);

            const formData = new FormData();
            tempFiles.forEach((value, index) => {
                formData.append(`files[${index}]`, value);
            });

            router.post(route("task.files", { task: task.id }), formData, {
                onError: (e) => {
                    console.error(e);
                },
            });
        }
    };

    const handleSaveChanges = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        patch(route("task.update", { task: task.id }));
    };

    return (
        <DialogContent className="bg-nav border-bordercolor text-textcolor max-w-[700px]">
            <DialogHeader className="grid grid-cols-[auto,auto]">
                <Button
                    variant="outline"
                    className={cn(
                        "w-fit text-xs px-0 h-8 hover:bg-green/20 hover:border-green hover:text-green",
                        completed ? "text-green border-green" : "text-textcolor"
                    )}
                    autoFocus={false}
                    onClick={handleMarkComplete}
                >
                    <Check className="h-4" />
                    <p className="pr-1.5">
                        {completed ? "Completed" : "Mark Complete"}
                    </p>
                </Button>
                <div className="flex flex-col">
                    <p className="text-sm font-bold">Track Time</p>
                    <TaskTracker task={task} />
                </div>
            </DialogHeader>
            <SectionTitle
                className="w-full"
                defaultValue={task.name}
                onChange={(e) => setData("name", e.target.value)}
            />
            <form onSubmit={handleSaveChanges}>
                <div className="p-3 grid grid-cols-[30%,auto] items-center gap-2">
                    <InputLabel value="Assignee" />
                    <SelectAssignee
                        task={taskData}
                        members={members}
                        onSelect={handleSelectAssignee}
                    />

                    <InputLabel value="Start Date" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-fit gap-2 px-3",
                                    pastDueDate && "text-danger"
                                )}
                            >
                                <CalendarIcon />
                                {taskData.start_date
                                    ? format(new Date(date.start_date), "PP")
                                    : "-"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-bordercolor bg-nav w-auto">
                            <Calendar
                                mode="single"
                                className="text-textcolor"
                                selected={new Date(taskData.start_date)}
                                onSelect={handleSelectStartDate}
                            />
                        </PopoverContent>
                    </Popover>

                    <InputLabel value="Due Date" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-fit gap-2 px-3",
                                    pastDueDate && "text-danger"
                                )}
                            >
                                <CalendarIcon />
                                {taskData.due_date
                                    ? format(new Date(date.due_date), "PP")
                                    : "-"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-bordercolor bg-nav w-auto">
                            <Calendar
                                mode="single"
                                className="text-textcolor"
                                selected={new Date(taskData.due_date)}
                                onSelect={handleSelectDueDate}
                            />
                        </PopoverContent>
                    </Popover>

                    <InputLabel value="Priority" />
                    <div className="flex items-center gap-2">
                        <SelectPriority
                            task={taskData}
                            priorities={priorities}
                            onSelect={handleSelectPriority}
                        />
                    </div>
                </div>
                <div className="p-3 flex flex-col gap-2">
                    <InputLabel value="Description" />
                    <Textarea
                        value={taskData.description || ""}
                        onChange={(e) => setData("description", e.target.value)}
                        className="bg-black min-h-[10rem] border-bordercolor unset resize-none ring-0 focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="p-3 flex items-center gap-3 max-w-fit">
                    {task.files.length > 0
                        ? task.files.map((value) => {
                              return <FileComp key={value.id} file={value} />;
                          })
                        : null}
                    <FileInput onChange={handleFileInputChange} />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" className="bg-blue">
                            Save Changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
