import { cn } from "@/utils";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";


export function SectionTitle({ className, type = 'text', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }) {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, []);

    return (
        <input 
            {...props}
            type={type}
            className={cn(
                "text-textcolor font-extrabold bg-inherit border-none rounded-md focus:ring-textcolor",
                className
            )}
            ref={inputRef}
            />
    )
}