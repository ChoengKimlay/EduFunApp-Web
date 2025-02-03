import { CanActivate, Router, Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { DashboardPageComponent } from './resources/dashboard/component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { CreateQuizComponent } from './resources/create-quiz/component';
import { initialDataResolver } from './app.resolver';

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
        path: '',
        canActivate: [AuthGuard],
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardPageComponent
            },
            {
                path: 'creator',
                component: CreateQuizComponent
            }
        ]
    }
];
