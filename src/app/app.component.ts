import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './models';

import './content/app.less';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    public currentUser: User;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(data => this.currentUser = data);
    }

    public navigate(route) {
        this.router.navigate([route]);
    }

    public logoutUser() {
        this.authenticationService.logoutUser();
        this.navigate('/login');
    }
}
