import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Card";
import { MyTaskItem } from "@/Components/Home/MyTaskItem";
import { ScrollArea } from "@/Components/ScrollArea";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, Task, Workspace } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";

export default function Home({ auth, workspaceList, workspace, projects, tasks }: PageProps & { workspace: Workspace, projects?: Project[], tasks: Task[] }) {

    return (
        <Authenticated user={auth.user} workspaces={workspaceList} currentWorkspace={workspace} projects={projects}>
            <div className="px-10 pb-10 pt-6 text-textcolor">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1>{format(new Date(), "PPP")}</h1>
                    <h1 className="text-3xl font-bold">Hello There, {auth.user.name}</h1>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="border-bordercolor bg-dark-gray">
                                <CardHeader className="border-b-[1px] border-bordercolor">
                                    <CardTitle>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={auth.user.avatar} />
                                                <AvatarFallback>{auth.user.name[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            My Task
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="py-3 px-6">
                                    <ScrollArea className="h-96">
                                        {tasks.map((task) => {
                                            return (
                                                <MyTaskItem key={task.id} task={task} />
                                            )
                                        })}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            <Card className="border-bordercolor bg-dark-gray">
                                <CardHeader>
                                    <CardTitle>Projects</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <Card className="border-bordercolor bg-dark-gray">
                            <CardHeader>
                                <CardTitle>People</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}