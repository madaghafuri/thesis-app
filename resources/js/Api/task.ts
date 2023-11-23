import { useQuery } from "@tanstack/react-query";
import { endPoint } from "./endpoint";

export type Operator = 'eq' | 'gt' | 'lt' | 'like';

type Filter = 'name' | 'startDate' | 'dueDate';

export type TaskFilterParams = {
    [key in `${Filter}[${Operator}]`]?: string;
}

export type TaskRequestParams = TaskFilterParams & {
    project_id: string;
    includeUser?: "true" | "false";
}

export async function getTask(params: TaskRequestParams) {
    const resp = await fetch(endPoint.getTask() + '?' + new URLSearchParams(params));

    if (!resp.ok) {
        throw new Error('Network response was not ok');
    }

    return resp.json().then();
}

export function useTasks(params: TaskRequestParams) {
    const { data, isLoading, ...rest } = useQuery({ queryKey: ['tasks'], queryFn: () => getTask(params), enabled: true });

    return { data, isLoading, ...rest};
}