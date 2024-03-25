import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Card";
import { useModal } from "@/Components/Dialog";
import { MyTaskItem } from "@/Components/Home/MyTaskItem";
import { ScrollArea } from "@/Components/ScrollArea";
import { InviteWorkspaceForm } from "@/Components/Workspace/InviteWorkspaceForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, Task, User, Workspace } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { CircleDashed, Plus, UserIcon } from "lucide-react";

export default function Home({
    auth,
    workspaceList,
    workspace,
    projects,
    tasks,
    members,
}: PageProps & {
    workspace: Workspace;
    projects?: Project[];
    tasks: Task[];
    members: User[];
}) {
    const workspaceMembers: User[] = [
        {
            avatar: "",
            color: "",
            email: "",
            id: -1,
            email_verified_at: "",
            name: "",
        },
        ...members,
    ];
    const { showModal } = useModal();

    const handleInvite = () => {
        showModal(
            <InviteWorkspaceForm workspace={workspace} />,
            "Invite with email"
        );
    };

    return (
        <Authenticated
            user={auth.user}
            workspaces={workspaceList}
            currentWorkspace={workspace}
            projects={projects}
        >
            <div className="px-10 pb-10 pt-6 text-textcolor">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1>{format(new Date(), "PPP")}</h1>
                    <h1 className="text-3xl font-bold">
                        Hello There, {auth.user.name}
                    </h1>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="border-bordercolor bg-dark-gray">
                                <CardHeader className="border-b-[1px] border-bordercolor">
                                    <CardTitle>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage
                                                    src={auth.user.avatar}
                                                />
                                                <AvatarFallback>
                                                    {auth.user.name[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            My Task
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="py-3 px-6">
                                    <ScrollArea className="h-96">
                                        {tasks.map((task) => {
                                            return (
                                                <MyTaskItem
                                                    key={task.id}
                                                    task={task}
                                                />
                                            );
                                        })}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            <Card className="border-bordercolor bg-dark-gray">
                                <CardHeader>
                                    <CardTitle>Projects</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {projects?.map((val) => {
                                        return (
                                            <div key={val.id}>{val.name}</div>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="border-bordercolor bg-dark-gray">
                            <CardHeader>
                                <CardTitle>People</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-4 items-center gap-3">
                                {workspaceMembers.map((member) => {
                                    if (member.id === -1) {
                                        return (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-4 hover:bg-bgactive p-3 rounded-md"
                                            >
                                                <div
                                                    key={member.id}
                                                    className="relative w-16 h-12 outline-dashed outline-2 rounded-full text-white/50 cursor-pointer"
                                                    onClick={handleInvite}
                                                >
                                                    <Plus className="absolute left-0 right-0 top-0 bottom-0 m-auto inset" />
                                                </div>
                                                <p className="text-white/50">
                                                    Invite
                                                </p>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={member.id}
                                            className="flex items-center gap-4 hover:bg-bgactive p-3 rounded-md"
                                        >
                                            <Avatar>
                                                <AvatarImage
                                                    src={member.avatar}
                                                />
                                                <AvatarFallback
                                                    style={{
                                                        backgroundColor:
                                                            member.color,
                                                    }}
                                                >
                                                    {member.name[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="text-white select-none">
                                                {member.name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
