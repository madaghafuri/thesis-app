import { addDays, eachDayOfInterval, endOfMonth, format, getDate, getDay, getYear, setDate, startOfMonth } from "date-fns";
import { CalendarDayCell } from "./CalendarDayCell";

export function CalendarView({date}: { date: Date }) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const daysOfMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    //Get the days from the previous month
    const prevMonthDays = [];
    const firstDayOfMonth = getDay(monthStart);
    if (firstDayOfMonth !== 0) {
        const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0);
        const prevMonthLastDate = prevMonthEnd.getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = new Date(prevMonthEnd.getFullYear(), prevMonthEnd.getMonth(), prevMonthLastDate - i);
            prevMonthDays.push(day);
        }
    }

    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    // const lastDayOfMonth = getDay(monthEnd);
    // if (lastDayOfMonth !== 6) {
    //     const nextMonthStart = new Date(date.getFullYear(), date.getMonth()+1, 0);
    //     const nextMonthFirstDate = nextMonthStart.getDate();
    //     for (let i = 1; i <= lastDayOfMonth; i++) {
    //         const day = new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth(), nextMonthFirstDate + i);
    //         nextMonthDays.push(day);
    //     }
    // }   

    // console.log(nextMonthDays, lastDayOfMonth);

    return (
        <div className="grid grid-cols-1">
            <div className="grid grid-cols-7">
                {weekDays.map((day, index) => {
                    return (
                        <div key={index} className="capitalize outline outline-1 outline-bordercolor px-2">{day}</div>
                    )
                })}
            </div>
            <div className="grid grid-cols-7">
                {prevMonthDays.map((day, index) => {
                    return (
                        <CalendarDayCell date={day} key={index}>
                            {/* {day.toDateString()} */}
                        </CalendarDayCell>
                    )
                })}
                {daysOfMonth.map((day, index) => {
                    return (
                        <CalendarDayCell key={index} date={day}>
                            {/* {day.toDateString()} */}
                        </CalendarDayCell>
                    )
                })}
            </div>
        </div>
    )
}