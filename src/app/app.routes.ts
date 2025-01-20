import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';
import { LoginPageComponent } from './resources/login/component';
import { DashboardPageComponent } from './resources/dashboard/component';
import { AuthGuard } from '../app/core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/join', pathMatch: 'full' },
  { 
    path: 'join', 
    component: LandingComponent
  },
  { 
    path: 'login-page', 
    component: LoginPageComponent,
    canActivate: [NoAuthGuard],
  },
  { 
    path: 'dashboard', 
    component: DashboardPageComponent, 
    canActivate: [AuthGuard] 
  },
];
