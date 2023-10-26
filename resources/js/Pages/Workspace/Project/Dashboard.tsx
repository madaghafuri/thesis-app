import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { props } = usePage<PageProps<ProjectViewProps>>();

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout>
                <div className="text-textcolor">
                    Dashboard Content
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}