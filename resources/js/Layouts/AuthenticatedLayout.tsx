import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, router } from '@inertiajs/react';
import { Project, User, Workspace } from '@/types';
import { NavSectionContainer } from '@/Components/NavSectionContainer';
import { NavSectionItem } from '@/Components/NavSectionItem';
import PrimaryButton from '@/Components/PrimaryButton';
import { useDialog } from '@/Components/Dialog';
import { CreateWorkspaceForm } from '@/Components/Workspace/CreateWorkspaceForm';
import { CreateProjectForm } from '@/Components/Workspace/Project/CreateProjectForm';
import { Briefcase, ChevronLeft, ClipboardCheck, Home, Pencil, Trash } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/Components/ContextMenu';

type AuthenticatedProps = {
    user: User;
    header?: ReactNode;
    workspaces?: Workspace[];
    currentWorkspace?: Workspace;
    projects?: Project[];
}

export default function Authenticated({ user, header, children, workspaces, currentWorkspace, projects }: PropsWithChildren<AuthenticatedProps>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { setIsOpen, showDialog } = useDialog();

    const handleCreateWorkspace = () => {
        showDialog(<CreateWorkspaceForm />, 'Create Workspace');
    }

    const handleCreateProject = () => {
        showDialog(<CreateProjectForm currentWorkspace={currentWorkspace} />, 'Create Project');
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-nav border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden h-10 space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <PrimaryButton className='bg-blue' onClick={handleCreateWorkspace}>
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
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
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
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex'>
                <nav className='w-1/6 bg-nav flex flex-col'>
                    <div className='p-3 border-b-[1px] border-bordercolor'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className='flex items-center justify-between'>
                                    <div className='text-textcolor flex flex-row items-center gap-3 select-none'>
                                        <Briefcase />
                                        <div className='flex flex-col'>
                                            <h1 className='text-textweak font-semibold'>{currentWorkspace?.title || '...'}</h1>
                                            <p className='text-xs font-extralight'>Free</p>
                                        </div>
                                    </div>
                                    <PrimaryButton className='text-textcolor hover:bg-bgactive px-3'>
                                        <ChevronLeft />
                                    </PrimaryButton>
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <div className='p-3'>
                                    {workspaces?.map((value) => {
                                        return (
                                            <NavSectionItem className='text-textcolor' active={currentWorkspace?.id == value.id} key={value.id} href={route('workspaces.show', value.id)} >
                                                {value.title}
                                            </NavSectionItem>
                                        )
                                    })}
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className='flex flex-col p-3 border-b-[1px] border-bordercolor'>
                        <NavSectionItem className='hover:bg-bgactive rounded-lg' active={route().current('workspaces.home', currentWorkspace?.id)} href={route('workspaces.home', { id: currentWorkspace?.id })} >
                            <Home className='h-4 text-textweak' />
                            <h3 className='text-textcolor'>Home</h3>
                        </NavSectionItem>
                        <NavSectionItem className='hover:bg-bgactive rounded-lg' active={route().current('workspaces.tasks', currentWorkspace?.id)} href={route('workspaces.tasks', currentWorkspace?.id)}>
                            <ClipboardCheck className='h-4 text-textweak' />
                            <h3 className='text-textcolor'>My Tasks</h3>
                        </NavSectionItem>
                    </div>
                    <NavSectionContainer header='Project' onClickAdd={handleCreateProject}>
                        {/** Dynamically iterated project */}
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className='flex flex-col'>
                                    {projects?.map((project) => {
                                        return (
                                            <NavSectionItem
                                                className='font-thin text-sm'
                                                key={project.id}
                                                active={route().current('workspaces.projects.show', { workspace: project.workspace_id, project: project.id })
                                                || route().current('project.list', { workspace: project.workspace_id, project: project.id })}
                                                href={route('workspaces.projects.show', { workspace: project.workspace_id, project: project.id })}
                                            >
                                                {project.name}
                                            </NavSectionItem>
                                        )
                                    })}
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className='bg-content text-textcolor border-bordercolor'>
                                <ContextMenuItem className='hover:bg-bgactive'>
                                    <Pencil className='h-3.5 text-textweak' />
                                    Rename
                                </ContextMenuItem>
                                <ContextMenuItem className='hover:bg-bgactive text-danger'>
                                    <Trash className='h-3.5'/>
                                    Delete
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </NavSectionContainer>
                    <NavSectionContainer header='Insight'>
                        <NavSectionItem active={false} href={route('dashboard')} >
                            Goals
                        </NavSectionItem>
                    </NavSectionContainer>
                </nav>

                <main className='grow min-h-screen bg-content'>{children}</main>
            </div>
        </div>
    );
}
