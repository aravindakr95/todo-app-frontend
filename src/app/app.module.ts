import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { RegisterComponent } from './register';
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
        AlertComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
