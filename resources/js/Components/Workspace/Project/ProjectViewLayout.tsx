import NavLink from "@/Components/NavLink"
import { Priority, Project, User, Workspace } from "@/types"
import { usePage } from "@inertiajs/react"
import { Calendar, KanbanSquare, LayoutDashboard, ScrollText } from "lucide-react"
import { PropsWithChildren } from "react"

export type ProjectViewProps = {
    data: {
        workspace: Workspace;
        projectList: Project[];
        project: Project;
        members: User[];
        priorities: Priority[];
    }
}

function ViewLayoutHeader() {
    const { props } = usePage<ProjectViewProps>();
    const data = props.data;

    return (
        <div className="flex flex-row items-center">
            <div className="w-1/12">
                Project Logo
            </div>
            <div className="grow">
                <h1 className="text-xl">{props.data.project.name}</h1>
                <section className="flex text-lg gap-1">
                    <NavLink href={route('project.list', { workspace: data.workspace.id, project: data.workspace.id })} active={route().current('project.list', { workspace: data.workspace.id, project: data.project.id })} >
                        <ScrollText className="h-4" />
                        List
                    </NavLink>
                    <NavLink href={route('project.board', { workspace: data.workspace.id, project: data.workspace.id })} active={route().current('project.board', { workspace: data.workspace.id, project: data.project.id })} >
                        <KanbanSquare className="h-4" />
                        Board
                    </NavLink>
                    <NavLink href={route('project.calendar', { workspace: data.workspace.id, project: data.project.id })} active={route().current('project.calendar', { workspace: data.workspace.id, project: data.project.id })}>
                        <Calendar className="h-4" />
                        Calendar
                    </NavLink>
                    <NavLink href={route('project.dashboard', { workspace: data.workspace.id, project: data.project.id })} active={route().current('project.dashboard', { workspace: data.workspace.id, project: data.project.id })}>
                        <LayoutDashboard className="h-4" />
                        Dashboard
                    </NavLink>
                </section>
            </div>
            <div className="w-2/12">
                Share
            </div>
        </div>
    )
}

export function ProjectViewLayout({ children }: PropsWithChildren) {

    return (
        <section className="w-full">
            <header className="text text-textcolor px-4 pt-2 border-b-[1px] border-bordercolor">
                <ViewLayoutHeader />
            </header>
            <main>{children}</main>
        </section>
    )
}