import { useEffect, useState } from "react"

export const useTrackTime = () => {
    const [counting, setCounting] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (counting) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev+1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [counting])

    const startTimer = () => {
        setCounting(true);
    }

    const stopTimer = () => {
        setCounting(false);
        setElapsedTime(0);
    }

    return {
        elapsedTime,
        isCounting: counting,
        startTimer,
        stopTimer
    }
}