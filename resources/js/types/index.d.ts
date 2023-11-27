export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: any,
    workspaceList: any[]
};

export type Workspace = {
    id: number;
    pivot: {
        user_id: number;
        workspace_id: number;
    };
    title: string;
    created_at: string;
    updated_at: string;
}

export type Project = {
    id: number;
    name: string;
    workspace_id: number;
    created_at: string;
    updated_at: string;
}


export type Section = {
    id: number;
    project_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    tasks: Task[]
}

export type Task = {
    id: number;
    section_id: number;
    project_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user: User | null;
    priority: Priority;
    due_date: string;
    times: TimeTrack[];
    description: string;
}

export type Priority = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export type TimeTrack = {
    id: number;
    task_id: number;
    start_time?: string;
    end_time?: string;
    duration: number;
    created_at: string;
    updated_at: string;
}

export type WorkloadUser = User & {
    tasks: Task[];
}