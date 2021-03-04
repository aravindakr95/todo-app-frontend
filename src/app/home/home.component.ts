import { Component, OnInit } from '@angular/core';

import { User } from '@/models';
import {
    AuthenticationService } from '@/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    public currentUser: User;

    constructor(private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {}
}
