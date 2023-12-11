import { Avatar, AvatarFallback } from "@/Components/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Card";
import { Echart } from "@/Components/EChart";
import { ScrollArea } from "@/Components/ScrollArea";
import { LogItem } from "@/Components/Workspace/Project/Dashboard/LogItem";
import { ProjectViewLayout, ProjectViewProps } from "@/Components/Workspace/Project/ProjectViewLayout";
import { TaskCard } from "@/Components/Workspace/Project/Section/Task/TaskCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Log, PageProps, Section, Task } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { props } = usePage<PageProps<ProjectViewProps & { sections: Section[]; logs: Log[]; tasks: Task[] }>>();
    const data: { value: number | undefined; name: string }[] = props.sections.map((val) => {
        return { value: val.taskCount, name: val.name }
    })

    return (
        <Authenticated user={props.auth.user} workspaces={props.workspaceList} projects={props.data.projectList} currentWorkspace={props.data.workspace} >
            <ProjectViewLayout >
                <div className="text-textcolor p-4 grid grid-cols-3 gap-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Card className="border-bordercolor">
                            <CardHeader>
                                <CardTitle>Task Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Echart 
                                    option={{
                                        legend: {
                                            top: '0%',
                                            right: '0%',
                                            textStyle: {
                                                color: 'white'
                                            },
                                            align: "right",
                                            orient: 'vertical'
                                            
                                        },
                                        tooltip: {
                                            trigger: 'item'
                                        },
                                        darkMode: true,
                                        series: [
                                            {
                                                type: 'pie',
                                                data,
                                                radius: ['60%', '100%'],
                                                labelLine: {
                                                    show: false
                                                },
                                                label: {
                                                    show: false
                                                },
                                            }
                                        ],
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <Card className="border-bordercolor">
                            <CardHeader>
                                <CardTitle>Project Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Hello World</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="border-bordercolor">
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-96">
                                {props.logs.map((log) => {
                                    return (
                                        <LogItem taskLog={log} />
                                    )
                                })}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className="border-bordercolor">
                        <CardHeader>
                            <CardTitle>Recent Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-96">
                                {props.tasks.map((task) => {
                                    return (
                                        <TaskCard task={task} />
                                    )
                                })}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className="border-bordercolor">
                        <CardHeader>
                            <CardTitle>Member</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {props.data.members.map((member) => {
                                return (
                                    <div className="flex items-center gap-2">
                                        <Avatar style={{ backgroundColor: member.color }} className="text-black">
                                            <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {member.name}
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>
            </ProjectViewLayout>
        </Authenticated>
    )
}