import TextInput from "@/Components/TextInput";
import { Task } from "@/types"
import { cn } from "@/utils";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type TaskRowProps = {
    task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
    const [currTask, setCurrTask] = useState(task);

    useEffect(() => {

    }, [])

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrTask((prev) => {
            return {...prev, name: event.target.value}
        });
    }

    const handleConfirmNameChange = () => {
        router.patch(route('task.update', { task: task.id }), { name: currTask.name });
    }
    
    return (
        <div className="w-full h-[2.4rem] flex items-center text-textcolor text-sm font-thin hover:bg-bgactive">
            <div className="w-[44rem] h-[2.4rem] border-y-[1px] border-r-[1px] border-bordercolor pl-10 flex items-center">
                <TaskColumn value={currTask.name} onChange={handleNameChange} className="w-full h-full bg-inherit focus:bg-bgactive rounded-md select-none" onBlur={handleConfirmNameChange} />
            </div>
            <div className="w-40 p-2 min-h-full border-y-[1px] border-r-[1px] border-bordercolor">Assignee</div>
            <div className="w-40 p-2 min-h-full border-y-[1px] border-r-[1px] border-bordercolor">Due Date</div>
            <div className="w-40 p-2 min-h-full border-y-[1px] border-r-[1px] border-bordercolor">Priority</div>
            <div className="grow p-2 min-h-full border-y-[1px] border-bordercolor">
                <Plus className="h-5" />
            </div>
        </div>
    )
}

export const TaskColumn = ({ className, type, isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) inputRef.current?.focus();
    }, []);

    return (
        <input
            {...props}
            className={cn(
                "focus:ring-0 focus:ring-offset-0 focus:border-transparent border-transparent",
                className
            )}
            ref={inputRef}
        />
    )
}