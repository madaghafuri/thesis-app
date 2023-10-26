import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function List() {
    const { props } = usePage<PageProps<ProjectViewProps>>();

    return (
        <Authenticated user={props.auth.user} currentWorkspace={props.data.workspace} workspaces={props.workspaceList} projects={props.data.projectList} >
            <ProjectViewLayout>
                <div className="text-textcolor">
                    List Content
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}