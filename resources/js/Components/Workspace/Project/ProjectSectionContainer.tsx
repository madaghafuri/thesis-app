import PrimaryButton from "@/Components/PrimaryButton";
import { cn } from "@/utils";
import { ChevronDown, GripVertical, Plus } from "lucide-react";
import { ChangeEvent, MouseEventHandler, PropsWithChildren, useState } from "react";
import { SectionMenu } from "./Section/SectionMenu";
import { SectionTitle } from "./Section/SectionTitle";
import { router } from "@inertiajs/react";
import { Section } from "@/types";
import TextInput from "@/Components/TextInput";
import { DragOverEvent, useDndMonitor } from "@dnd-kit/core";

type Props = {
    section: Section;
    onAddTask?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export function ListSectionContainer({ section, children, onAddTask = () => {} }: PropsWithChildren<Props>) {
    const [hovered, setHovered] = useState(false);
    const [sectionName, setSectionName] = useState(section.name);

    const handleChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setSectionName(event.target.value);
    }

    const handleBlur = () => {
        router.patch(route('section.update', { project: section.project_id, section: section.id }), { name: sectionName });
    }

    const handleAddTask = () => {
        router.post(route('task.store', { project: section.project_id, section: section.id }));
    }

    return (
        <div>
            <section className="flex items-center border-b-[1px] border-bordercolor gap-1 py-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <GripVertical className={cn(
                    "text-textweak h-5",
                    { '-z-10': !hovered }
                )} />
                <PrimaryButton className="hover:bg-bgactive px-1 py-1">
                    <ChevronDown className="text-textweak h-5" />
                </PrimaryButton>
                <SectionTitle value={sectionName} onChange={handleChangeHeader} onBlur={handleBlur} />
        
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
                <div className="text-textweak py-1 px-10 hover:bg-bgactive select-none" onClick={handleAddTask}>
                    Add task...
                </div>
            </main>
        </div>
    )
}

export function BoardSectionContainer({ children, section, onAddTask = () => {} }: PropsWithChildren<Props>) {
    const [sectionName, setSectionName] = useState(section.name);
    const [containerHovered, setContainerHovered] = useState(false);
    const [editingSectionTitle, setEditingSectionTitle] = useState(false);

    const handleChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setSectionName(event.target.value);
    }

    const handleConfirmHeaderChange = () => {
        router.patch(route('section.update', { project: section.project_id, section: section.id }), { name: sectionName });
        setEditingSectionTitle(false);
    }

    const handleDragOver = ({ over }: DragOverEvent) => {
        // console.log(over);
    }

    useDndMonitor({ onDragOver: handleDragOver })

    return (
        <div className={cn(
            "rounded-md px-2 py-1 w-80 flex flex-col gap-1",
            containerHovered && "ring-bordercolor ring-1"
        )}>
            <section className="flex items-center justify-between gap-1" onMouseEnter={() => setContainerHovered(true)} onMouseLeave={() => setContainerHovered(false)}>
                {editingSectionTitle ? 
                <SectionTitle isFocused value={sectionName} onBlur={handleConfirmHeaderChange} onChange={handleChangeHeader} />
                : <PrimaryButton className="w-auto normal-case text-base tracking-tight" onClick={() => setEditingSectionTitle(true)} >{section.name}</PrimaryButton>}
                <div className="flex items-center">
                    <PrimaryButton className="hover:bg-bgactive px-1 py-1 text-textweak">
                        <Plus className="h-5" />
                    </PrimaryButton>
                    <SectionMenu />
                </div>
            </section>
            <main className="flex flex-col gap-0.5">
                {children}
                <PrimaryButton className="hover:bg-bgactive justify-center w-full text-textweak" onClick={onAddTask}>
                    Add task...
                </PrimaryButton>
            </main>
        </div>
    )
}