import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { TodoService } from '@/services/todo.service';

@Component({ templateUrl: 'todo-delete.component.html' })
export class TodoDeleteComponent implements OnDestroy {
    public todoId: string;
    public todoTitle: string;

    private subscription: Subscription;

    public saveClick = new Subject();

    constructor(public modalRef: BsModalRef, private todoService: TodoService) {}

    public onSubmit() {
        this.subscription = this.todoService.deleteTodoById(this.todoId)
            .pipe(first())
            .subscribe(() => {
                this.modalRef.hide();
                this.saveClick.next();
            });
    }

    public onCancelClick(): void {
        this.modalRef.hide();
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.saveClick.complete();
    }
}
