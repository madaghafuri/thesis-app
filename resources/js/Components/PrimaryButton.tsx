import { cn } from '@/utils';
import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={cn(
                "inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-textcolor uppercase tracking-widest focus:outline-none focus:ring-2",
                { 'opacity-25': disabled },
                className
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
