// ================================================================================>> Main Library
import { Routes } from '@angular/router';

// ================================================================================>> Custom Library


// ==================================================================================>> Component
import { AuthSignInComponent } from './sign-in/component';
import { AuthSignUpComponent } from './sign-up/component';
import { ForgotPasswordComponent } from './reset-password/component';

export default [
    {
        path: 'sign-in',
        component: AuthSignInComponent,
    },
    {
        path: 'sign-up',
        component: AuthSignUpComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
] as Routes;
