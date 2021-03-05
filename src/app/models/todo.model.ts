import { TodoStatus } from '@/enums/todo-status.enum';

export interface Todo {
    _id: string;
    status?: TodoStatus;
    title?: string;
    description?: string;
    timestamp?: number;
    __v?: number;
}
