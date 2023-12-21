import { Priority, Task } from "@/types"
import { Badge } from "./Badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { useState } from "react";

type Props = {
    task: Task;
    priorities: Priority[];
    onSelect?: (value: Priority) => void;
}

export function SelectPriority({ task, priorities, onSelect = () => {} }: Props) {
    const [open, setOpen] = useState(false);

    const availablePriorities: Priority[] = [
        {
            id: -1,
            name: "-",
            created_at: "never",
            updated_at: "never"
        },
        ...priorities
    ]

    return (
        <Select onValueChange={(value) => {
            const priority = availablePriorities.find((priority) => priority.name === value) as Priority;
            onSelect?.(priority);
            setOpen(false)
        }} open={open} onOpenChange={setOpen}>
            <SelectTrigger className="border-bordercolor w-24">
                <SelectValue className="text-textweak" placeholder={task.priority ? (
                    <Badge variant={task.priority.name.toLowerCase() as "high"}>{task.priority.name}</Badge>
                ): "-"} />
            </SelectTrigger>
            <SelectContent className="bg-nav text-textcolor border-bordercolor">
                <SelectGroup>
                    {availablePriorities.map((value) => {
                        const handleSelect = () => {
                            onSelect?.(value);
                            setOpen(false)
                        }

                        return (
                            <SelectItem value={value.name} key={value.id} onSelect={handleSelect} className="hover:bg-bgactive">
                                {value.id === -1 ? (
                                    <span>-</span>
                                ): (
                                    <Badge variant={value.name.toLowerCase() as "high"} >{value.name}</Badge>
                                )}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}