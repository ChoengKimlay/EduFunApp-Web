import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { HomePageComponent } from './resources/admin/home/component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { CreateQuizComponent } from './resources/create-quiz/component';
import { initialDataResolver } from './app.resolver';
import { LayoutComponent } from './resources/layout/layout.component';
import { DashboardPageComponent } from './resources/admin/dashboard/dashboard.component';
import { ProfilePageComponent } from './resources/account/profile/component';

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
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'dashboard',
                component: DashboardPageComponent
            },
            {
                path: 'profile',
                component: ProfilePageComponent
            }
        ]
    }
];
