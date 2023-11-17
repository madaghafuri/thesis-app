import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { useTrackTime } from "./hooks/useTimeTrack";
import { Task } from "./types";
import { Button } from "./Components/Button";
import { secondsToHours } from "./utils";
import { StopCircle } from "lucide-react";
import { router } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Components/Popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Components/Tabs";

export type TaskTrackerContextValue = ReturnType<typeof useTrackTime> & {
    currentlyTrackedTask: Task;
    setCurrentlyTrackedTask: Dispatch<SetStateAction<Task | null>>;
}

const TaskTrackerContext = createContext<TaskTrackerContextValue | null>(null);

export default function TaskTrackerContextProvider({children}: PropsWithChildren) {
    const [currentlyTrackedTask, setCurrentlyTrackedTask] = useState<Task | null>(null);

    const { elapsedTime, isCounting, startTimer, stopTimer } = useTrackTime();
    
    const handleStopTracker = () => {
        if (!!currentlyTrackedTask)
            router.post(route('time.stop', { task: currentlyTrackedTask.id }), { duration: elapsedTime }, {
            onSuccess: () => {
                stopTimer();
                setCurrentlyTrackedTask(null);
            }
        })
    }

    return (
        <TaskTrackerContext.Provider value={{ elapsedTime, isCounting, startTimer, stopTimer, currentlyTrackedTask: currentlyTrackedTask as Task, setCurrentlyTrackedTask }}>
            {children}
            {!!currentlyTrackedTask ? (
                <div className="fixed z-[100] text-textcolor bottom-5 right-10">
                    <div className="flex items-center rounded-md bg-black border-[1px] border-bordercolor h-10">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="rounded-r-none border-r-[1px] border-bordercolor hover:bg-bgactive px-2">
                                    {secondsToHours(elapsedTime)}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-black border-bordercolor shadow-2xl text-textcolor">
                                <Tabs defaultValue="timer">
                                    <TabsList className="w-full grid grid-cols-2">
                                        <TabsTrigger value="timer" >Timer</TabsTrigger>
                                        <TabsTrigger value="manual" >Manual</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="timer">
                                        <div className="grid grid-cols-1">
                                            <Button className="text-left bg-bgactive">
                                                {currentlyTrackedTask.name}
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="manual">
                                        <div>Manual Content</div>
                                    </TabsContent>
                                </Tabs>
                            </PopoverContent>
                        </Popover>
                        <Button className="hover:bg-bgactive px-2" onClick={handleStopTracker}>
                            <StopCircle className="text-danger h-5" />
                        </Button>
                    </div>
                </div>
            ): null}
        </TaskTrackerContext.Provider>
    )
}

export const useTaskTrackerContext = () => {
    const context = useContext(TaskTrackerContext);
    if (!context) {
        throw Error('useTaskTrackerContext must be used within a TaskTrackerContextProvider');
    }

    return context;
}