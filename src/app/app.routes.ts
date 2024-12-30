import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { LoginPageComponent } from './resources/login/component';
import { DashboardPageComponent } from './resources/dashboard/component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingComponent},
  { path: 'login-page', component: LoginPageComponent},
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
];
