import { useTasks } from "@/Api/task";
import { Button } from "@/Components/Button";
import { CalendarView } from "@/Components/Workspace/Project/Calendar/CalendarView";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, WorkloadUser } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { addMonths, format, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Filter, User } from "lucide-react";
import { useState } from "react";

export default function Calendar() {
    const { props } = usePage<PageProps<ProjectViewProps & { users: WorkloadUser[] }>>();
    const [date, setDate] = useState<Date>(new Date);

    // const { data } = useTasks({
    //     project_id: props.data.project.id.toString(),
    //     includeUser: 'true'
    // });

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <div className="flex items-center p-3">
                    <div className="grid grid-cols-2 gap-2 items-center mr-2">
                        <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                            <User className="h-4" />
                            Person
                        </Button>
                        <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                            <Filter className="h-4" />
                            Filter
                        </Button>
                    </div>
                    <span> | </span>
                    <div className="flex gap-2 ml-2 items-center">
                        <Button className="h-8 px-2 hover:bg-bgactive font-thin text-textweak" variant="outline">
                            Today
                        </Button>
                        <div className="flex items-center justify-center text-textweak">
                            <Button className="h-8 px-1 hover:bg-bgactive rounded-full" variant="outline" onClick={() => setDate(prev => subMonths(prev, 1))}>
                                <ChevronLeft className="h-4" />
                            </Button>
                            <Button className="h-8 px-1 hover:bg-bgactive rounded-full" variant="outline" onClick={() => setDate(prev => addMonths(prev, 1))}>
                                <ChevronRight className="h-4" />
                            </Button>
                        </div>
                        <div>{format(date, "MMMM")}{' '}{format(date, "yyyy")}</div>
                    </div>
                </div>
                <CalendarView date={date} />
            </ProjectViewLayout>
        </Authenticated>
    )
}