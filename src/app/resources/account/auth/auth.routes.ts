// ================================================================================>> Main Library
import { Routes } from '@angular/router';

// ================================================================================>> Custom Library


// ==================================================================================>> Component
import { AuthSignInComponent } from './sign-in/component';
import { AuthSignUpComponent } from './sign-up/component';
import { ForgotPasswordComponent } from './reset-password/component';
import { AccountProfileComponent } from '../user-profile/component';

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

    {
        path: 'profile',
        component: AccountProfileComponent
    }
] as Routes;
