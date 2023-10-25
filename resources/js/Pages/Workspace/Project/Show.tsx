import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, Workspace } from "@/types";

type ShowPageProps = {
    data: {
        workspace: Workspace;
        projectList: Project[];
        project: Project;
    }
}

export default function Show({ auth, workspaceList, data }: PageProps<ShowPageProps>) {
    return (
        <Authenticated user={auth.user} currentWorkspace={data.workspace} workspaces={workspaceList} projects={data.projectList}>
            <div className="p-6 text-textcolor">
                Show Project
            </div>
        </Authenticated>
    )
}