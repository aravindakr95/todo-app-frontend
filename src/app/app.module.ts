import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTableModule } from 'ornamentum';
import {ModalModule } from 'ngx-bootstrap/modal';

import { appRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { HistoryComponent } from '@/history';
import { TodoAddComponent } from '@/todo-add';
import { TodoEditComponent } from '@/todo-edit';
import { TodoDeleteComponent } from '@/todo-delete';
import { AlertComponent } from './alert';

import { ErrorInterceptor, JwtInterceptor } from '@/helpers';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        DataTableModule.forRoot(),
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        HistoryComponent,
        AlertComponent,
        TodoAddComponent,
        TodoEditComponent,
        TodoDeleteComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    entryComponents: [
        TodoAddComponent,
        TodoEditComponent,
        TodoDeleteComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
