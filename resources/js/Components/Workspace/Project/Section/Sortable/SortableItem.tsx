import { Base } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from "react";

export function SortableItem({ children, item }: PropsWithChildren<{ item: any }>) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
        id: item.id,
        data: {

        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            {children}
        </div>
    )
}