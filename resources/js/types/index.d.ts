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
    created_at: number;
    updated_at: number;
}