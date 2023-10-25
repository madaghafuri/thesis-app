import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Workspace } from "@/types";

export default function Home({ auth, workspaceList, workspace, projects }: PageProps & { workspace: Workspace, projects?: any }) {
    return (
        <Authenticated user={auth.user} workspaces={workspaceList} currentWorkspace={workspace} projects={projects}>
            <div className="text-textcolor p-6">Hello World</div>
        </Authenticated>
    )
}