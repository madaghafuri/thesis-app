import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Workspace } from "@/types";

export default function MyTask({ auth, workspaceList, workspace }: PageProps & { workspace?: Workspace }) {
    return (
        <Authenticated user={auth.user} workspaces={workspaceList} currentWorkspace={workspace}>
            <div className="text-textcolor">My Tasks</div>
        </Authenticated>
    )
}