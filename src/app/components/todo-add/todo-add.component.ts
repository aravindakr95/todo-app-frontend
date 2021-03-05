import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Todo } from '@/models';

import { AlertService, TodoService } from '@/services';

@Component({ templateUrl: 'todo-add.component.html' })
export class TodoAddComponent implements OnInit, OnDestroy {
    public todoForm: FormGroup;
    public todo: Todo;

    private subscription: Subscription;

    public saveClick = new Subject();
    public submitted = false;

    constructor(private formBuilder: FormBuilder,
                public modalRef: BsModalRef,
                private todoService: TodoService,
                private alertService: AlertService
    ) {
    }

    // convenience getter for easy access to form fields
    public get f() {
        return this.todoForm.controls;
    }

    public ngOnInit(): void {
        this.todoForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.todoForm.invalid) {
            console.log(this.todoForm.invalid)
            return;
        }

        this.subscription = this.todoService.addTodo(this.todoForm.value)
            .pipe(first())
            .subscribe(() => {
                    this.modalRef.hide();
                    this.alertService.success('Todo added successful', false);
                    this.saveClick.next();
                },
                error => {
                    this.alertService.error(error);
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
