import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
