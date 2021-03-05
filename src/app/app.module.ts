import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTableModule } from 'ornamentum';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';

import { appRoutingModule } from './app.routing';

import {
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HistoryComponent,
    TodoAddComponent,
    TodoEditComponent,
    TodoDeleteComponent,
    AlertComponent
} from '@/components';

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
export class AppModule {
}
