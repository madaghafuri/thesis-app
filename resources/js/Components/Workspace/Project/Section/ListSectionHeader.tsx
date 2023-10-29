import { Plus } from "lucide-react";

export function ListSectionHeader() {

    return (
        <div className="flex w-full items-center text-textweak text-xs font-thin">
            <div className="w-[44rem] p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor">
                Task Name
            </div>
            <div className="w-40 p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Assignee</div>
            <div className="w-40 p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Due Date</div>
            <div className="w-40 p-2 hover:bg-bgactive border-y-[1px] border-r-[1px] border-bordercolor" >Priority</div>
            <div className="grow p-2 hover:bg-bgactive border-y-[1px] border-bordercolor" >
                <Plus className="h-4" />
            </div>
        </div>
    )
}