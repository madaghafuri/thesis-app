import { Button } from "@/Components/Button";
import {
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
} from "@/Components/Sheet";
import {
    Check,
    ChevronDown,
    Play,
    Plus,
    StopCircle,
    Trash,
    Trash2,
    UserCircle2,
    X,
} from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import InputLabel from "@/Components/InputLabel";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Avatar, AvatarFallback } from "@/Components/Avatar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/Command";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Files, PageProps, Priority, Task, User } from "@/types";
import { ProjectViewProps } from "../../ProjectViewLayout";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/Calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/Select";
import { Textarea } from "@/Components/TextArea";
import { SelectSingleEventHandler } from "react-day-picker";
import { format, formatISO } from "date-fns";
import { ChangeEvent, FormEvent, Fragment, ReactNode, useState } from "react";
import { Badge } from "@/Components/Badge";
import { AcceptedFileType, cn, getFileType, secondsToHours } from "@/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/Accordion";
import { useTaskTrackerContext } from "@/TaskTrackerProvider";
import { FileInput } from "./FileInput";
import TextIcon from "@/assets/text.svg?react";
import ImageIcon from "@/assets/image.svg?react";
import XLSIcon from "@/assets/xls.svg?react";
import DOCSIcon from "@/assets/docs.svg?react";
import PPTIcon from "@/assets/ppt.svg?react";
import PDFIcon from "@/assets/pdf.svg?react";
import { TaskTracker } from "./TaskTracker";

const FileType: Record<AcceptedFileType, ReactNode> = {
    text: <TextIcon />,
    images: <ImageIcon />,
    xls: <XLSIcon />,
    docs: <DOCSIcon />,
    ppt: <PPTIcon />,
    pdf: <PDFIcon />,
};

const FileTypeName: Record<AcceptedFileType, string> = {
    text: "Text File",
    pdf: "PDF File",
    images: "Image File",
    xls: "Document",
    docs: "Document",
    ppt: "Document",
};

export function FileComp({ file }: { file: Files }) {
    const fileType = getFileType(file.filePath);

    const handleDeleteFile = () => {
        // router.post(route('file.destroy', { file: file.id }), {
        //     data: {
        //         fileName: file.files
        //     },
        // });
    };

    const handleDownloadFile = () => {
        router.get(
            route("file.download", {
                filePath: file.filePath,
                fileName: file.fileName,
            })
        );
    };

    return (
        <div className="flex items-center gap-2 rounded-md p-2 outline outline-1 outline-bordercolor hover:outline-textcolor">
            {FileType[fileType]}
            <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1 w-32">
                    <h3 className="text-xs font-light truncate">
                        {file.fileName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xs font-light">
                            {FileTypeName[fileType]}
                        </h3>
                        <a
                            className="text-xs font-light hover:text-blue underline select-none"
                            href={`${window.location.origin}/storage/${file.filePath}`}
                            target="_blank"
                        >
                            Download
                        </a>
                    </div>
                </div>
                <Button
                    className="hover:bg-bgactive h-8 px-2"
                    onClick={handleDeleteFile}
                >
                    <X className="h-5" />
                </Button>
            </div>
        </div>
    );
}

export function TaskSheet({ task }: { task: Task }) {
    const {
        data: taskData,
        setData,
        processing,
        patch,
        errors,
    } = useForm<Task>(task);
    const { props } = usePage<PageProps<ProjectViewProps>>();
    const [openAssigneeOptions, setOpenAssigneeOptions] = useState(false);
    const [date, setDate] = useState<{
        start_date: Date;
        due_date: Date;
    }>({
        start_date: new Date(task.start_date),
        due_date: new Date(task.due_date),
    });
    const [files, setFiles] = useState<File[]>([]);
    const [completed, setCompleted] = useState(task.completed);

    const {
        isCounting,
        elapsedTime,
        startTimer,
        stopTimer,
        setCurrentlyTrackedTask,
        currentlyTrackedTask,
    } = useTaskTrackerContext();

    const currentTaskDate = new Date(taskData.due_date);

    const accumulatedTime = task.times.reduce((time, curr) => {
        return (time += curr.duration);
    }, 0);

    const priorities: Priority[] = [
        { id: -1, name: "-", created_at: "Never", updated_at: "Never" },
        ...props.data.priorities,
    ];

    const members: User[] = props.data.members;

    const handleSaveChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        patch(route("task.update", { task: task.id }));
    };

    const handleSelectDueDate = (val: Date) => {
        setDate((prev) => {
            const newDate = { ...prev };
            newDate.due_date = val;
            return newDate;
        });
        setData("due_date", formatISO(val));
    };

    const handleSelectStartDate = (val: Date) => {
        setDate((prev) => {
            const newDate = { ...prev };
            newDate.start_date = val;
            return newDate;
        });
        setData("start_date", formatISO(val));
    };

    const startTimeTracking = () => {
        router.post(
            route("time.start", { task: task.id }),
            {},
            {
                onSuccess: () => {
                    startTimer();
                    setCurrentlyTrackedTask(task);
                },
            }
        );
    };

    const stopTimeTracking = () => {
        router.post(
            route("time.stop", { task: task.id }),
            { duration: elapsedTime },
            {
                onSuccess: () => {
                    stopTimer();
                    setCurrentlyTrackedTask(null);
                },
            }
        );
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const tempFiles = Array.from(e.target.files);
            setFiles([...files, ...tempFiles]);

            const formData = new FormData();
            tempFiles.forEach((val, index) => {
                formData.append(`files[${index}]`, val);
            });

            router.post(route("task.files", { task: task.id }), formData, {
                onProgress: (progress) => {},
                onError: (error) => {
                    console.log(error);
                },
            });
        }
    };

    const handleDeleteTask = () => {
        router.delete(route("task.destroy", { task: task.id }));
    };

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

    return (
        <SheetContent className="bg-content text-textcolor border-bordercolor min-w-[40rem]">
            <SheetHeader className="grid grid-cols-3 items-center">
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
                <div className="flex flex-col items-start">
                    <h3>Time Track</h3>
                    <TaskTracker task={task} />
                </div>
            </SheetHeader>
            <div>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSaveChange}
                >
                    <div className="mt-4 w-full">
                        <SectionTitle
                            className="min-w-full"
                            placeholder="Write a Task name"
                            isFocused={false}
                            value={taskData.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Assignee" />

                        <Popover
                            open={openAssigneeOptions}
                            onOpenChange={setOpenAssigneeOptions}
                        >
                            <div className="flex items-center">
                                <PopoverTrigger>
                                    {taskData.user ? (
                                        <div className="flex items-center gap-2 rounded-md hover:bg-bgactive p-2 w-fit">
                                            <Avatar
                                                style={{
                                                    backgroundColor:
                                                        taskData.user.color,
                                                }}
                                            >
                                                <AvatarFallback className="text-black">
                                                    {taskData.user.name[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            {taskData.user.name}
                                        </div>
                                    ) : (
                                        <div className="flex p-2 items-center rounded-md justify-start text-textweak hover:bg-bgactive w-fit gap-2 tracking-tight">
                                            <UserCircle2 className="h-4" />
                                            <h4 className="font-thin text-sm hover:text-textcolor">
                                                No Assignee
                                            </h4>
                                        </div>
                                    )}
                                </PopoverTrigger>
                                <Button
                                    className="hover:bg-bgactive w-fit h-8 px-2"
                                    onClick={() => setData("user", null)}
                                >
                                    <X className="h-4" />
                                </Button>
                            </div>
                            <PopoverContent className="bg-black border-bordercolor p-0">
                                <Command className="text-textweak">
                                    <CommandInput
                                        placeholder="Search members..."
                                        className="focus:ring-0 focus:border-none"
                                    />
                                    <CommandEmpty>
                                        No member found.
                                    </CommandEmpty>
                                    <CommandGroup heading="Member">
                                        {members.map((member) => {
                                            const handleSelectAssignee = () => {
                                                setData("user", member);
                                                setOpenAssigneeOptions(false);
                                            };

                                            return (
                                                <CommandItem
                                                    key={member.id}
                                                    value={member.name}
                                                    className="text-textcolor gap-2 hover:bg-bgactive"
                                                    onSelect={
                                                        handleSelectAssignee
                                                    }
                                                >
                                                    <Avatar
                                                        style={{
                                                            backgroundColor:
                                                                member.color,
                                                        }}
                                                    >
                                                        <AvatarFallback className="text-black">
                                                            {member.name[0].toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {member.name}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Start Date" />

                        <Popover>
                            <PopoverTrigger>
                                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-bgactive text-textweak w-auto">
                                    <CalendarIcon className="h-4" />
                                    <h4 className="font-thin text-sm hover:text-textcolor">
                                        {taskData.start_date ? (
                                            format(date.start_date, "PPP")
                                        ) : (
                                            <span>No Start Date</span>
                                        )}
                                    </h4>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-nav w-auto text-textweak p-0 border-bordercolor">
                                <Calendar
                                    mode="single"
                                    selected={date.start_date}
                                    onSelect={
                                        handleSelectStartDate as SelectSingleEventHandler
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <InputLabel className="text-center" value="Due Date" />

                        <Popover>
                            <PopoverTrigger>
                                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-bgactive text-textweak w-auto">
                                    <CalendarIcon className="h-4" />
                                    <h4 className="font-thin text-sm hover:text-textcolor">
                                        {taskData.due_date ? (
                                            format(date.due_date, "PPP")
                                        ) : (
                                            <span>No Due Date</span>
                                        )}
                                    </h4>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-nav w-auto text-textweak p-0 border-bordercolor">
                                <Calendar
                                    mode="single"
                                    selected={date.due_date}
                                    onSelect={
                                        handleSelectDueDate as SelectSingleEventHandler
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <InputLabel value="Priority" />

                        <Select
                            onValueChange={(value) => {
                                const priority = priorities.find(
                                    (priority) => priority.name === value
                                ) as Priority;
                                setData("priority", priority);
                            }}
                        >
                            <SelectTrigger className="border-bordercolor">
                                <SelectValue
                                    className="text-textweak"
                                    placeholder={
                                        taskData.priority ? (
                                            <Badge
                                                variant={
                                                    taskData.priority.name.toLowerCase() as "high"
                                                }
                                            >
                                                {taskData.priority.name}
                                            </Badge>
                                        ) : (
                                            "-"
                                        )
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-nav text-textcolor border-bordercolor">
                                <SelectGroup>
                                    {priorities.map((value) => {
                                        const handlePrioritySelect = () => {
                                            setData("priority", value);
                                        };

                                        if (value.id < 0) {
                                            return (
                                                <SelectItem
                                                    key={value.id}
                                                    value={value.name}
                                                    className="hover:bg-bgactive"
                                                >
                                                    {value.name}
                                                </SelectItem>
                                            );
                                        }

                                        return (
                                            <SelectItem
                                                onSelect={handlePrioritySelect}
                                                className="hover:bg-bgactive"
                                                key={value.id}
                                                value={value.name}
                                            >
                                                <Badge
                                                    className="text-black"
                                                    variant={
                                                        value.name.toLowerCase() as
                                                            | "high"
                                                            | "medium"
                                                            | "low"
                                                    }
                                                >
                                                    {value.name}
                                                </Badge>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <InputLabel value="Description" />
                    <Textarea
                        value={taskData.description || ""}
                        className="bg-black min-h-[10rem] border-none unset resize-none ring-0 focus:ring-0"
                        placeholder="What is this taskData about?"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <div className="flex items-center gap-3 mt-3">
                        {task.files.length > 0
                            ? task.files.map((value) => {
                                  return (
                                      <FileComp key={value.id} file={value} />
                                  );
                              })
                            : null}
                        <FileInput onChange={handleFileInputChange} />
                    </div>
                    <SheetFooter className="mt-4">
                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue">
                                Save Changes
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </div>
        </SheetContent>
    );
}
