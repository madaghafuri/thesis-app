import { cn } from "@/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";

type Props = {
    /**
     * Based on current route
     */
    active: boolean;
}

export function NavSectionItem({ active = false, className = "", children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link {...props} className={cn(
            "inline-flex items-center px-3 py-1 text-base font-medium transition duration-150 ease-in-out rounded-md",
            className,
            { 'bg-bgactive': active }
        )}>
            {children}
        </Link>
    )
}