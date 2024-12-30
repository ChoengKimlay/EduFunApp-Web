import { Routes } from '@angular/router';
import { LandingComponent } from './resources/landing/component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingComponent}
];
