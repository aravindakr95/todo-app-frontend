import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register';
import { LoginComponent } from '@/login';
import { HomeComponent } from '@/home';

import { AuthGuard } from '@/helpers/guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
