import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register';
import { LoginComponent } from '@/login';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
