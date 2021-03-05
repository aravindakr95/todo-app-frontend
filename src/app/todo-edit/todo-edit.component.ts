import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Todo } from '@/models';

import { TodoService } from '@/services/todo.service';
import { AlertService } from '@/services';

@Component({ templateUrl: 'todo-edit.component.html' })
export class TodoEditComponent implements OnDestroy {
    public todoForm: FormGroup;
    public todo: Todo;

    private subscription: Subscription;

    public saveClick = new Subject();

    constructor(private formBuilder: FormBuilder,
                public modalRef: BsModalRef,
                private todoService: TodoService,
                private alertService: AlertService
    ) {
    }

    public setTodoFormData(todo: Todo) {
        this.todoForm = this.formBuilder.group({
            _id: todo['_id'],
            title: todo.title,
            description: todo.description,
            status: todo.status
        });

        this.todo = todo;
    }

    public onSubmit() {
        this.subscription = this.todoService.updateTodo(this.todoForm.value)
            .pipe(first())
            .subscribe(() => {
                this.modalRef.hide();
                this.alertService.success(`Todo updated successful`, true);
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
