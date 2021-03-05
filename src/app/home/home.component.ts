import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataTableComponent } from 'ornamentum';

import { Todo, User } from '@/models';

import { AuthenticationService } from '@/services';
import { TodoService } from '@/services/todo.service';

import { TodoStatus } from '@/enums';

import { TodoAddComponent } from '@/todo-add';
import { TodoEditComponent } from '@/todo-edit';
import { TodoDeleteComponent } from '@/todo-delete';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    public todoForm: FormGroup;
    public currentUser: User;
    public todosList: Todo[];
    public selectedRows: string[];

    public loading = false;

    private subscription: Subscription;
    private dataTable: DataTableComponent;

    constructor(private formBuilder: FormBuilder,
                private modalService: BsModalService,
                private authenticationService: AuthenticationService,
                private todoService: TodoService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    private getSelectedRows(todos): string[] {
        return todos.map((todo: Todo) => {
            if (todo.status === TodoStatus.ACTIVE) {
                return todo['_id'];
            }
        })
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

    public openAddNewModal(): void {
        this.loading = true;

        const modalRef: BsModalRef = this.modalService.show(TodoAddComponent, { ignoreBackdropClick: true });
        modalRef.content.saveClick.subscribe(() => {
            this.refreshTodosList();
        });
    }

    public openEditModal(todo: Todo): void {
        const modalRef: BsModalRef = this.modalService.show(TodoEditComponent, { ignoreBackdropClick: true });
        modalRef.content.setTodoFormData(todo);
        modalRef.content.saveClick.subscribe(() => {
            this.refreshTodosList();
        });
    }

    public openDeleteModal(todoId: string, todoTitle: string) {
        const modalRef: BsModalRef = this.modalService.show(TodoDeleteComponent, { ignoreBackdropClick: true });
        modalRef.content.todoId = todoId;
        modalRef.content.todoTitle = todoTitle;
        modalRef.content.saveClick.subscribe(() => {
            this.refreshTodosList();
        });
    }

    public isActiveTodo(status: TodoStatus) {
        return status === TodoStatus.ACTIVE;
    }

    public toggleStatus(todo: Todo): void {
        const status: Todo = {
            _id: todo['_id'],
            status: todo.status === TodoStatus.ACTIVE ? TodoStatus.INACTIVE : TodoStatus.ACTIVE
        };

        this.subscription = this.todoService.updateTodo(status)
            .pipe(first())
            .subscribe(() => {
                this.refreshTodosList();
            })
    }

    public refreshTodosList(): void {
        this.subscription = this.todoService.getTodosByUserId(this.currentUser.userId)
            .pipe(first())
            .subscribe((todos) => {
                this.todosList = todos.data;
                this.selectedRows = this.getSelectedRows(todos.data);
            });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
