import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { DashboardPageComponent } from './resources/dashboard/component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LandingComponent
    },

    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('app/resources/account/auth/auth.routes')
    },

    {
        path: '',
        loadChildren: () => import('app/resources/games/games.routes')
    },

    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardPageComponent
    },
];
