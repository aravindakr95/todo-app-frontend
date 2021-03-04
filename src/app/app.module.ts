import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { AlertComponent } from './alert';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        AlertComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
