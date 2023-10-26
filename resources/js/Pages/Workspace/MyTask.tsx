import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, Workspace } from "@/types";

export default function MyTask({ auth, workspaceList, workspace, projectList }: PageProps & { workspace?: Workspace, projectList?: Project[] }) {
    return (
        <Authenticated user={auth.user} workspaces={workspaceList} currentWorkspace={workspace} projects={projectList}>
            <div className="text-textcolor">My Tasks</div>
        </Authenticated>
    )
}