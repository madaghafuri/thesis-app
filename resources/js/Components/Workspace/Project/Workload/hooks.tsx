import { Task, WorkloadUser } from "@/types";
import { differenceInDays, getDay, secondsToHours } from "date-fns";
import { useEffect, useRef, useState } from "react";

export function useDayCellWidth() {
    const [dayWidth, setDayWidth] = useState(0);
    const dayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dayRef.current !== null) {
            setDayWidth(dayRef.current.clientWidth);
        }
    }, [])

    return { dayWidth, setDayWidth, dayRef }
}
/**
 * a react hook to calculate the size of a EventBlock components
 * @param startDate start_date of a task in Date format
 * @param endDate due date of a task in Date format
 * @param dayCellWidth width an day Element Header
 */
export function useTaskSize(startDate: Date, endDate: Date, dayCellWidth: number) {
    const dayDiff = differenceInDays(endDate, startDate);
    const weekDayStart = getDay(startDate);
    // Absolute left position in percentage string ex: "100%"
    const leftPos = Math.abs((weekDayStart / 7) * 100).toFixed(3).toString();
    const dayDifferences = dayDiff > (7 - weekDayStart) ? (7 - weekDayStart) : dayDiff;
    // Size of a task width relative to startDate and endDate in pixel(px)
    const rangeDurationWidth = Math.abs(dayCellWidth * dayDifferences).toString() + "px";

    return {
        leftPos,
        rangeDurationWidth
    }
}
export function getAccumulatedHoursByUser(user: WorkloadUser) {
    const accumulatedTimeForUser = user.tasks.map((val) => {
        const accumulatedTaskTime = val.times.reduce((time, curr) => time += curr.duration, 0);
        return accumulatedTaskTime
    });

    const seconds = accumulatedTimeForUser.reduce((taskTime, curr) => taskTime += curr, 0);
    return secondsToHours(seconds);
}