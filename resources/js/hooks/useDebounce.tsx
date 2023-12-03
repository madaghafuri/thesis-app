import { ChangeEvent, useCallback, useEffect, useState } from "react";

export function useDebounce<T>(initialValue: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(initialValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [initialValue, delay]);

    return [debouncedValue] as const;
}