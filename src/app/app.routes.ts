import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { DashboardPageComponent } from './resources/dashboard/component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LandingComponent
    },

    {
        path: 'auth',
        loadChildren: () => import('app/resources/account/auth/auth.routes')
    },

    {
        path: 'dashboard',
        component: DashboardPageComponent
    },
];
