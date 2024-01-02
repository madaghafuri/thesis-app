import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/Accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/Avatar";
import { Button } from "@/Components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/Tabs";
import TextInput from "@/Components/TextInput";
import { useToast } from "@/Components/Toast/useToast";
import { useTaskTrackerContext } from "@/TaskTrackerProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { Task } from "@/types";
import { cn, secondsToHours } from "@/utils";
import { router } from "@inertiajs/react";
import { ClassValue } from "clsx";
import { format } from "date-fns";
import { Pencil, PlayCircle, StopCircle, Trash } from "lucide-react";
import {
    ChangeEvent,
    FocusEvent,
    InputHTMLAttributes,
    useEffect,
    useState,
} from "react";
import { P, match } from "ts-pattern";

export function TaskTracker({ task }: { task: Task }) {
    const [open, setOpen] = useState(false);
    const [timeTrack, setTimeTrack] = useState(0);
    const [errMessage, setErrMessage] = useState("");
    const { toast } = useToast();
    const {
        elapsedTime,
        startTimer,
        stopTimer,
        isCounting,
        setCurrentlyTrackedTask,
        currentlyTrackedTask,
    } = useTaskTrackerContext();

    const accumulatedTime = task.times.reduce(
        (acc, val) => (acc += val.duration),
        0
    );

    const handleSaveManualTimeInput = () => {
        router.post(
            route("time.store", { task: task.id }),
            {
                duration: timeTrack,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Time Tracked successfully",
                        description: `You tracked ${secondsToHours(
                            timeTrack
                        )} on ${format(new Date(), "PP")}`,
                    });
                    setTimeTrack(0);
                },
            }
        );
    };

    const handleStartTimer = () => {
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

    const handleStopTimer = () => {
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

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="h-8 hover:bg-bgactive items-center w-fit px-1 gap-1">
                    <p>
                        {!!currentlyTrackedTask &&
                        currentlyTrackedTask.id === task.id &&
                        isCounting
                            ? secondsToHours(elapsedTime)
                            : secondsToHours(accumulatedTime)}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="border-bordercolor text-textcolor p-0 bg-nav">
                <Accordion type="single" collapsible>
                    <AccordionItem value="acc-time">
                        <AccordionTrigger className="px-2">
                            <div className="flex items-center justify-between px-2 gap-2 w-full">
                                <Avatar>
                                    <AvatarImage src={task.user?.avatar} />
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: task.user?.color,
                                        }}
                                    >
                                        {task.user?.name[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-sm font-bold">
                                    {secondsToHours(accumulatedTime)}
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-nav">
                            {task.times.map((time) => {
                                return (
                                    <div
                                        key={time.id}
                                        className="grid grid-cols-[20%,60%,20%] px-3 py-1 items-center"
                                    >
                                        <p className="text-xs opacity-50">
                                            {
                                                format(
                                                    new Date(time.created_at),
                                                    "PP"
                                                ).split(",")[0]
                                            }
                                        </p>
                                        <p className="text-sm">
                                            {secondsToHours(time.duration)}
                                        </p>
                                        <div className="flex items-center">
                                            <Pencil className="h-4 text-white/50 cursor-pointer" />
                                            <Trash className="h-4 text-danger cursor-pointer" />
                                        </div>
                                    </div>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Tabs defaultValue="timer" className="bg-nav">
                    <TabsList className="w-full">
                        <TabsTrigger value="timer">Timer</TabsTrigger>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                    </TabsList>
                    <TabsContent value="timer" className="py-3 px-4">
                        <div className="flex items-center justify-between">
                            {isCounting ? (
                                <StopCircle
                                    className="cursor-pointer"
                                    onClick={handleStopTimer}
                                />
                            ) : (
                                <PlayCircle
                                    className="cursor-pointer"
                                    onClick={handleStartTimer}
                                />
                            )}
                            <p className="text-sm">
                                {secondsToHours(elapsedTime)}
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="manual"
                        className="grid grid-cols-1 gap-2"
                    >
                        <div className="py-2 px-3">
                            <TrackerManualInput
                                className=""
                                onTimeValue={(val) => setTimeTrack(val)}
                                onInvalidInput={(err) => setErrMessage(err)}
                            />
                            {errMessage ? (
                                <p className="text-xs text-danger">
                                    {errMessage}
                                </p>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                className="text-textcolor/50"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="h-8"
                                disabled={timeTrack === 0}
                                onClick={handleSaveManualTimeInput}
                            >
                                Save
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    );
}

export function TrackerManualInput({
    className,
    onChange = () => {},
    onTimeValue = () => {},
    onInvalidInput = () => {},
    ...props
}: {
    className?: ClassValue;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onTimeValue?: (totalSeconds: number) => void;
    onInvalidInput?: (err: string) => void;
} & InputHTMLAttributes<HTMLInputElement>) {
    const [textInput, setTextInput] = useState("");
    const [debouncedInput] = useDebounce(textInput, 500);

    useEffect(() => {
        match(debouncedInput)
            .with(
                P.not(
                    P.union(
                        P.string.includes("hours"),
                        P.string.includes("hour"),
                        P.string.includes("hrs"),
                        P.string.includes("hr"),
                        P.string.includes("minutes"),
                        P.string.includes("minute"),
                        P.string.includes("mins"),
                        P.string.includes("min"),
                        P.string.includes("seconds"),
                        P.string.includes("second"),
                        P.string.includes("secs"),
                        P.string.includes("sec")
                    )
                ),
                () => {
                    onInvalidInput("Invalid Input");
                }
            )
            .otherwise(() => onInvalidInput(""));
    }, [debouncedInput]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
        onChange?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
        const timeArray = event.target.value.split(" ");
        let totalSeconds = 0;

        timeArray.forEach((value, index) => {
            match(value)
                .with(P.union("hours", "hour", "hrs"), () => {
                    totalSeconds += parseInt(timeArray[index - 1]) * 60 * 60;
                    console.log("hours exist!");
                })
                .with(P.union("minutes", "minute", "mins", "min"), () => {
                    totalSeconds += parseInt(timeArray[index - 1]) * 60;
                    console.log("minutes exist!");
                })
                .with(P.union("seconds", "second", "secs", "sec"), () => {
                    totalSeconds += parseInt(timeArray[index - 1]);
                    console.log("seconds exist");
                });
        });

        onTimeValue?.(totalSeconds);
    };

    return (
        <TextInput
            {...props}
            className={cn("text-sm w-full", className)}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter time e.g. 3 hours and 20 mins"
        />
    );
}
