export interface ITodoRequest {
    id: number;
    name: string;
    title: string;
    isCompleted: boolean;
    description: string;
    dateCreated: Date | string;
}
