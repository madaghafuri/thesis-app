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

export type Base = {
    id: number;
    created_at: string;
    updated_at: string;
}

// export type Workspace = {
//     id: number;
//     pivot: {
//         user_id: number;
//         workspace_id: number;
//     };
//     title: string;
//     created_at: string;
//     updated_at: string;
// }

export type Workspace = Base & {
    pivot: {
        user_id: number;
        workspace_id: number;
    }
    title: string;
}

export type Project = Base & {
    name: string;
    workspace_id: number;
}

export type Section = Base & {
    project_id: number;
    name: string;
    tasks: Task[]
}

export type Task = Base & {
    section_id: number;
    project_id: number;
    name: string;
    user: User;
    priority: Priority;
    due_date: string;
}

export type Priority = Base & {
    name: string;
}