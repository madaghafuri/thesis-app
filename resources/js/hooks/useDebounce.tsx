import { useCallback, useEffect, useState } from "react";

export function useDebounce<T>(initialValue: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(initialValue), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [initialValue, delay]);

    return [debouncedValue] as const;
}
