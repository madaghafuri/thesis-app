import { ChevronDown, GripVertical, MoreHorizontal, Plus } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import PrimaryButton from "./PrimaryButton";

type Props = {
    header: string;
    onClickAdd?: () => void;
}

export function NavSectionContainer({ header = 'Default', children, onClickAdd }: PropsWithChildren<Props>) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="flex flex-col text-textcolor text-lg font-semibold mt-4">
            <section className="flex flex-row items-center justify-between pr-3">
                <div className="flex flex-row items-center gap-1 py-1 w-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <ChevronDown className="text-textweak h-4" />
                    <h1 className="select-none">{header}</h1>
                    <PrimaryButton className="hover:bg-bgactive px-1 py-1" onClick={onClickAdd}>
                        <Plus className="h-5" />
                    </PrimaryButton>
                    <PrimaryButton className="hover:bg-bgactive px-1 py-1">
                        <MoreHorizontal className="h-5" />
                    </PrimaryButton>
                </div>

                {hovered ? (<GripVertical className="h-5" />) : null}
            </section>
            <main className="pl-6 pr-3 flex flex-col">{children}</main>
        </div>
    )
}