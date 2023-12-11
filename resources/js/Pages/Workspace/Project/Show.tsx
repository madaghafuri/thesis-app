import { ProjectViewLayout } from "@/Components/Workspace/Project/ProjectViewLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, Workspace } from "@/types";
import { usePage } from "@inertiajs/react";

type ShowPageProps = {
    data: {
        workspace: Workspace;
        projectList: Project[];
        project: Project;
    }
}

export default function Show({ auth, workspaceList }: PageProps) {
    const { props } = usePage<ShowPageProps>();

    return (
        <Authenticated user={auth.user} currentWorkspace={props.data.workspace} workspaces={workspaceList} projects={props.data.projectList}>
            <ProjectViewLayout>
                <div>Hello World</div>
            </ProjectViewLayout>
        </Authenticated>
    )
}