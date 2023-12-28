import { useState, PropsWithChildren, ReactNode } from "react";
import Dropdown from "@/Components/Dropdown";
import { Link, router } from "@inertiajs/react";
import { Project, User, Workspace } from "@/types";
import { NavSectionContainer } from "@/Components/NavSectionContainer";
import { NavSectionItem } from "@/Components/NavSectionItem";
import PrimaryButton from "@/Components/PrimaryButton";
import { useModal } from "@/Components/Dialog";
import { CreateWorkspaceForm } from "@/Components/Workspace/CreateWorkspaceForm";
import { CreateProjectForm } from "@/Components/Workspace/Project/CreateProjectForm";
import {
    Briefcase,
    ChevronLeft,
    ClipboardCheck,
    Home,
    Pencil,
    Trash,
} from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ContextMenu";
import Logo from "@/assets/logo.svg?react";

type AuthenticatedProps = {
    user: User;
    header?: ReactNode;
    workspaces?: Workspace[];
    currentWorkspace?: Workspace;
    projects?: Project[];
};

export default function Authenticated({
    user,
    header,
    children,
    workspaces,
    currentWorkspace,
    projects,
}: PropsWithChildren<AuthenticatedProps>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { setIsOpen, showModal } = useModal();

    const handleCreateWorkspace = () => {
        showModal(<CreateWorkspaceForm />, "Create Workspace");
    };

    const handleCreateProject = () => {
        showModal(
            <CreateProjectForm currentWorkspace={currentWorkspace} />,
            "Create Project"
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-nav border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center gap-2">
                                <Link href="/">
                                    <Logo className="w-10 h-10" />
                                </Link>
                                <h1 className="text-white text-3xl font-semibold select-none">
                                    Manja
                                </h1>
                            </div>

                            <div className="hidden h-10 space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <PrimaryButton
                                    className="bg-blue"
                                    onClick={handleCreateWorkspace}
                                >
                                    Create
                                </PrimaryButton>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>
            </nav>

            <div className="flex justify-center min-h-screen">
                <nav className="w-1/6 bg-nav flex flex-col">
                    <div className="p-3 border-b-[1px] border-bordercolor">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center justify-between">
                                    <div className="text-textcolor flex flex-row items-center gap-3 select-none">
                                        <Briefcase />
                                        <div className="flex flex-col">
                                            <h1 className="text-textweak font-semibold">
                                                {currentWorkspace?.title ||
                                                    "..."}
                                            </h1>
                                            <p className="text-xs font-extralight">
                                                Free
                                            </p>
                                        </div>
                                    </div>
                                    <PrimaryButton className="text-textcolor hover:bg-bgactive px-3">
                                        <ChevronLeft />
                                    </PrimaryButton>
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <div className="p-3">
                                    {workspaces?.map((value) => {
                                        return (
                                            <NavSectionItem
                                                className="text-textcolor"
                                                active={
                                                    currentWorkspace?.id ==
                                                    value.id
                                                }
                                                key={value.id}
                                                href={route(
                                                    "workspaces.show",
                                                    value.id
                                                )}
                                            >
                                                {value.title}
                                            </NavSectionItem>
                                        );
                                    })}
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col p-3 border-b-[1px] border-bordercolor">
                        <NavSectionItem
                            className="hover:bg-bgactive rounded-lg"
                            active={route().current(
                                "workspaces.home",
                                currentWorkspace?.id
                            )}
                            href={route("workspaces.home", {
                                id: currentWorkspace?.id,
                            })}
                        >
                            <Home className="h-4 text-textweak" />
                            <h3 className="text-textcolor">Home</h3>
                        </NavSectionItem>
                    </div>
                    <NavSectionContainer
                        header="Project"
                        onClickAdd={handleCreateProject}
                    >
                        {/** Dynamically iterated project */}
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex flex-col">
                                    {projects?.map((project) => {
                                        return (
                                            <NavSectionItem
                                                className="font-thin text-sm"
                                                key={project.id}
                                                active={
                                                    route().current(
                                                        "workspaces.projects.show",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    ) ||
                                                    route().current(
                                                        "project.list",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    ) ||
                                                    route().current(
                                                        "project.board",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    ) ||
                                                    route().current(
                                                        "project.calendar",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    ) ||
                                                    route().current(
                                                        "project.workload",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    ) ||
                                                    route().current(
                                                        "project.dashboard",
                                                        {
                                                            workspace:
                                                                project.workspace_id,
                                                            project: project.id,
                                                        }
                                                    )
                                                }
                                                href={route(
                                                    "workspaces.projects.show",
                                                    {
                                                        workspace:
                                                            project.workspace_id,
                                                        project: project.id,
                                                    }
                                                )}
                                            >
                                                {project.name}
                                            </NavSectionItem>
                                        );
                                    })}
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-content text-textcolor border-bordercolor">
                                <ContextMenuItem className="hover:bg-bgactive">
                                    <Pencil className="h-3.5 text-textweak" />
                                    Rename
                                </ContextMenuItem>
                                <ContextMenuItem className="hover:bg-bgactive text-danger">
                                    <Trash className="h-3.5" />
                                    Delete
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </NavSectionContainer>
                </nav>

                <main className="w-5/6 min-h-screen bg-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
