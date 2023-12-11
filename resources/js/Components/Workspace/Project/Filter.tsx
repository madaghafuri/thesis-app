import { Button } from "@/Components/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, } from "@/Components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Filter, User } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
    renderItems : () => ReactNode;
}

export function FilterSection({ renderItems }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid grid-cols-2 gap-2 items-center mr-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                        <User className="h-4" />
                        Person
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-nav text-textweak p-0 border-bordercolor">
                    <Command>
                        <CommandInput className="ring-0 border-none focus:ring-0 focus:border-none " placeholder="Search members..." />
                        <CommandEmpty>No members found</CommandEmpty>
                        <CommandGroup>
                            <div className="flex items-center justify-center">
                                <p className="text-textweak text-sm">Select one people</p>
                            </div>
                            {renderItems()}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                <Filter className="h-4" />
                Filter
            </Button>
        </div>
    )
}