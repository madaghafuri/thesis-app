import PrimaryButton from "@/Components/PrimaryButton";
import { cn } from "@/utils";
import { ChevronDown, GripVertical, Plus } from "lucide-react";
import { ChangeEvent, MouseEventHandler, PropsWithChildren, useState } from "react";
import { SectionMenu } from "./Section/SectionMenu";
import { SectionTitle } from "./Section/SectionTitle";
import { router } from "@inertiajs/react";
import { Section } from "@/types";

type Props = {
    section: Section;
    onAddTask?: MouseEventHandler<HTMLDivElement>;
}

export function ProjectSectionContainer({ section, children, onAddTask = () => {} }: PropsWithChildren<Props>) {
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