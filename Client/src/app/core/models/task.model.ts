export interface TastItem {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
}

export interface UpdateTaskRequest {
    title: string;
    description: string;
    isCompleted: boolean;
}