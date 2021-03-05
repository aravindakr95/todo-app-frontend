import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '@/models';
import { TodoStatus } from '@/enums';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private static todo_url = 'http://localhost:3000/v1/api/todos';

    constructor(private http: HttpClient) {}

    public addTodo(todo: Todo): Observable<any> {
        return this.http.post(`${TodoService.todo_url}/add`, todo);
    }

    public updateTodo(todo: Todo): Observable<any> {
        return this.http.put(`${TodoService.todo_url}/${todo['_id']}`, todo);
    }

    public getTodosByUserId(userId, isHistory = false, status = TodoStatus.ACTIVE): Observable<any> {
        if (isHistory) {
            const params = { userId };
            return this.http.get(`${TodoService.todo_url}`, { params });
        }

        const params = { userId, status };
        return this.http.get(`${TodoService.todo_url}`, { params });
    }

    public deleteTodoById(todoId: string): Observable<any> {
        return this.http.delete(`${TodoService.todo_url}/${todoId}`);
    }
}
