import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataTableComponent } from 'ornamentum';

import { Todo, User } from '@/models';

import { AuthenticationService } from '@/services';
import { TodoService } from '@/services/todo.service';

@Component({ templateUrl: 'history.component.html' })
export class HistoryComponent implements OnInit, OnDestroy {
    public todoForm: FormGroup;
    public currentUser: User;
    public todosList: Todo[];

    private subscription: Subscription;
    private dataTable: DataTableComponent;

    constructor(private formBuilder: FormBuilder,
                private modalService: BsModalService,
                private authenticationService: AuthenticationService,
                private todoService: TodoService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    public ngOnInit(): void {
        this.todoForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.refreshTodosList();
    }

    public onDataTableInit(dataTable: DataTableComponent): void {
        this.dataTable = dataTable;
    }

    public refreshTodosList(): void {
        this.subscription = this.todoService.getTodosByUserId(this.currentUser.userId, true)
            .pipe(first())
            .subscribe((todos) => {
                this.todosList = todos.data;
            });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
