import { Task, User } from "@/types";
import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Fragment } from "react";
import { Avatar, AvatarFallback } from "./Avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./Command";

export function SelectAssignee({ task, members, onSelect = () => {} }: { task: Task; members: User[], onSelect?: (member: User) => void; }) {

    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button className="hover:bg-bgactive w-fit h-12 gap-2">
                    {task.user ? (
                        <Fragment>
                            <Avatar style={{ backgroundColor: task.user.color }}>
                                <AvatarFallback className="text-black">
                                    {task.user.name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {task.user.name}
                        </Fragment>
                    ) : "Hello"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="border-bordercolor bg-nav text-textcolor p-0">
                <Command>
                    <CommandInput className="ring-0 border-none focus:ring-0 focus:border-none" placeholder="Search for members..." />
                    <CommandEmpty>Members not found</CommandEmpty>
                    <CommandGroup title="Members">
                        {members.map((member) => {
                            const handleSelect = () => {
                                onSelect?.(member);
                            }

                            return (
                                <CommandItem key={member.id} className="gap-3 hover:bg-bgactive" onSelect={handleSelect}>
                                    <Avatar style={{ backgroundColor: member.color}} className="text-black">
                                        <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}