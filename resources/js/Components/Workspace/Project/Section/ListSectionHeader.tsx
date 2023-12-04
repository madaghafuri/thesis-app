import { Plus } from "lucide-react";

export function ListSectionHeader() {

    return (
        <div className="flex w-full items-center text-textweak text-xs font-thin">
            <div className="w-[60%] p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor">
                Task Name
            </div>
            <div className="grow grid grid-cols-3">
                <div className="p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Assignee</div>
                <div className="p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Due Date</div>
                <div className="p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Priority</div>
            </div>
        </div>
    )
}