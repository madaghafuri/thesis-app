import { cn } from "@/utils";
import { InputHTMLAttributes, useState } from "react";


export function SectionTitle({ className, type = 'text', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }) {
    const [focus, setFocus] = useState(false);

    return (
        <input 
            {...props}
            type={type}
            className={cn(
                "text-textcolor font-medium bg-inherit border-none rounded-md focus:ring-textcolor",
            )}
            />
    )
}