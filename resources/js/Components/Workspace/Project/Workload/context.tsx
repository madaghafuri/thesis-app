// import { eachDayOfInterval, endOfWeek, getWeek, startOfWeek } from "date-fns";
// import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

// export type WorkloadValue = {
//     date: Date;
//     setDate: Dispatch<SetStateAction<Date>>;
// }

// export const WorkloadContext = createContext<WorkloadValue>({
//     date
// });

// export function WorkloadProvider({children}: PropsWithChildren) {
//     // Initial value is current date
//     const [date, setDate] = useState<Date>(new Date());
//     // Get the week of the given date in number
//     const week = getWeek(date);
//     const startDayOfWeek = startOfWeek(date);
//     const endDayOfWeek = endOfWeek(date);
//     const eachDayOfWeek = eachDayOfInterval({ start: startDayOfWeek, end: endDayOfWeek });
//     const dateRangeISO = eachDayOfWeek.map(val => val.toLocaleDateString());

//     return (
//         <WorkloadContext.Provider value={{  }}>
//             {children}
//         </WorkloadContext.Provider>
//     )
// }