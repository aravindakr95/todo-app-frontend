import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent, LoginComponent, HomeComponent, HistoryComponent } from '@/components';

import { AuthGuard } from '@/helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
