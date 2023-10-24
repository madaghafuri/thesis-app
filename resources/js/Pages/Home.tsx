import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Workspace } from "@/types";

export default function Home({ auth, workspaceList, workspace }: PageProps & { workspace: Workspace }) {
    return (
        <Authenticated user={auth.user} workspaceList={workspaceList} currentWorkspace={workspace}>
            <div className="text-textcolor p-6">Hello World</div>
        </Authenticated>
    )
}