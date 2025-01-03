import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { LoginPageComponent } from './resources/login/component';
import { DashboardPageComponent } from './resources/dashboard/component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { SignUpPageComponent } from './resources/signup/component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
    { path: 'landing-page', component: LandingComponent},
    { path: 'login-page', component: LoginPageComponent},
    { path: 'signup-page', component: SignUpPageComponent },
    // { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardPageComponent},
];
