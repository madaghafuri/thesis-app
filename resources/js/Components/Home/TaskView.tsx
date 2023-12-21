import { Priority, Task, User } from "@/types";
import { SectionTitle } from "../Workspace/Project/Section/SectionTitle";
import InputLabel from "../InputLabel";
import { SelectAssignee } from "../SelectAssignee";
import { router, useForm } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import { SelectPriority } from "../SelectPriority";
import { Calendar } from "../Calendar";
import { Calendar as CalendarIcon} from 'lucide-react'
import { format, isAfter } from "date-fns";
import { Textarea } from "../TextArea";
import { cn } from "@/utils";
import { FileInput } from "../Workspace/Project/Section/Task/FileInput";
import { ChangeEvent, FormEvent, useState } from "react";
import { FileComp } from "../Workspace/Project/Section/Task/TaskSheet";
import { DialogClose, DialogContent, DialogFooter } from "../BDialog";

export function TaskView({ task, members, priorities }: { task: Task; members: User[]; priorities: Priority[] }) {
    const { data: taskData, setData, patch } = useForm(task);
    const pastDueDate = isAfter(new Date(), new Date(task.due_date));
    const [files, setFiles] = useState<File[]>([]);

    const handleSelectAssignee = (member: User) => {
        setData('user', member);
    }

    const handleSelectPriority = (value: Priority) => {
        setData('priority', value);
    }

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const tempFiles = Array.from(e.target.files);
            setFiles([...files, ...tempFiles]);
            
            const formData = new FormData();
            tempFiles.forEach((value, index) => {
                formData.append(`files[${index}]`, value);
            })

            router.post(route('task.files', { task: task.id }), formData, {
                onError: (e) => {
                    console.error(e);
                }
            })
        }
    }

    const handleSaveChanges = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        patch(route('task.update', { task: task.id }));
    }

    return (
        <DialogContent className="bg-nav border-bordercolor text-textcolor max-w-[700px]">
            <SectionTitle className="w-full" defaultValue={task.name} onChange={e => setData('name', e.target.value)} />
            <form onSubmit={handleSaveChanges}>
                <div className="p-3 grid grid-cols-[30%,auto] items-center gap-2">
                    <InputLabel value="Assignee" />
                    <SelectAssignee task={taskData} members={members} onSelect={handleSelectAssignee} />

                    <InputLabel value="Start Date" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn(
                                "w-fit gap-2 px-3",
                                pastDueDate && "text-danger"
                            )}>
                                <CalendarIcon />
                                {taskData.start_date ? format(new Date(task.start_date), "PP"): "-"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-bordercolor bg-nav w-auto">
                            <Calendar mode="single" className="text-textcolor" />
                        </PopoverContent>
                    </Popover>

                    <InputLabel value="Priority" />
                    <div className="flex items-center gap-2">
                        <SelectPriority task={taskData} priorities={priorities} onSelect={handleSelectPriority} />
                    </div>
                </div>
                <div className="p-3 flex flex-col gap-2">
                    <InputLabel value="Description" />
                    <Textarea 
                        value={taskData.description || ""}
                        onChange={(e) => setData('description', e.target.value)}
                        className="bg-black min-h-[10rem] border-bordercolor unset resize-none ring-0 focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="p-3 flex items-center gap-3 max-w-fit">
                    {task.files.length > 0 ? task.files.map((value) => {
                        return (
                            <FileComp key={value.id} file={value} />
                        )
                    }): null}
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
    )
}