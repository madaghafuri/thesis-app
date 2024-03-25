import { Link, Head, router } from "@inertiajs/react";
import { PageProps, Workspace } from "@/types";
import { Button } from "@/Components/Button";

const featureList: { title: string; subTitle: string; description: string }[] =
    [
        {
            title: "Collaboration",
            subTitle: "Faster Innovation. More Innovation.",
            description:
                "The platform for rapid progress. Let your team focus on shipping features instead of managing infrastructure with automated CI/CD, built-in testing, and integrated collaboration",
        },
        {
            title: "Organization",
            subTitle: "Stay Organized. Stay Focused.",
            description:
                "Keep your projects and tasks organized in one place. No more juggling between apps. Everything you need is here.",
        },
        {
            title: "Accessibility",
            subTitle: "Access Anywhere. Anytime.",
            description:
                "Access your projects from any device, anywhere, anytime. Stay connected and stay updated.",
        },
    ];

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    workspaceList,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    workspaceList: Workspace[];
}>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-l from-slate-600 h-[500px] flex flex-col items-center justify-center gap-3">
                <h1 className="text-7xl font-extrabold text-white">
                    Manage Your Project Effortlessly
                </h1>
                <h4 className="text-white/70 text-2xl w-[800px] text-center">
                    Our app simplifies project management so you can stay
                    organized and focused.
                </h4>
                <div className="flex items-center gap=3">
                    {auth.user ? (
                        <Button
                            className="bg-white text-lg font-semibold"
                            onClick={() => {
                                router.visit(
                                    route(
                                        "workspaces.home",
                                        workspaceList[0].id
                                    )
                                );
                            }}
                        >
                            Go To App
                        </Button>
                    ) : (
                        <Button
                            className="bg-white text-lg font-semibold hover:bg-white/50"
                            onClick={() => {
                                router.visit(route("login"));
                            }}
                        >
                            Sign Up
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-gray-800 h-[300px] flex items-start justify-evenly pt-7">
                {featureList.map((value, index) => {
                    return (
                        <div
                            className="flex flex-col gap-3 text-white"
                            key={index}
                        >
                            <h4>{value.title}</h4>
                            <h2 className="text-4xl w-[300px] font-bold">
                                {value.subTitle}
                            </h2>
                            <p className="w-[300px] text-white/70">
                                {value.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
