import { cn } from '@/utils';
import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}

            className={cn(
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-textweak',
                {
                    'border-indigo-400 dark:border-indigo-600 focus:border-indigo-700': active,
                    'border-transparent hover:border-textweak': !active
                },
                className   
            )}
        >
            {children}
        </Link>
    );
}
