import PrimaryButton from "@/Components/PrimaryButton";
import { cn } from "@/utils";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, GripVertical, MoreHorizontal, Plus } from "lucide-react";
import { ChangeEvent, ChangeEventHandler, Fragment, MouseEventHandler, PropsWithChildren, useState } from "react";
import { SectionMenu } from "./Section/SectionMenu";

type Props = {
    header?: string;
    onChangeHeader?: ChangeEventHandler;
    onAddTask?: MouseEventHandler<HTMLDivElement>;
}

export function ProjectSectionContainer({ header = 'Section', children, onChangeHeader, onAddTask = () => {} }: PropsWithChildren<Props>) {
    const [hovered, setHovered] = useState(false);

    const handleChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div>
            <section className="flex items-center gap-1 py-3" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <GripVertical className={cn(
                    "text-textweak h-5",
                    { '-z-10': !hovered }
                )} />
                <PrimaryButton className="hover:bg-bgactive px-1 py-1">
                    <ChevronDown className="text-textweak h-5" />
                </PrimaryButton>
                <h2 className="select-none text-textcolor font-bold text-lg">{header}</h2>
        
                {hovered ? (
                    <PrimaryButton className="hover:bg-bgactive px-1 py-1">
                        <Plus className="text-textweak h-5" />
                    </PrimaryButton>
                ) : null}

                {hovered ? (
                    <SectionMenu />
                ) : null}
            </section>
            <main>
                {children}
                <div className="text-textweak py-1 px-10 hover:bg-bgactive select-none" onClick={onAddTask}>
                    Add task...
                </div>
            </main>
        </div>
    )
}