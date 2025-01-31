import { inject } from '@angular/core';
import { Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { jwtDecode } from "jwt-decode"
import { UserPayload } from 'helper/interfaces/payload.interface';
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = () => {

    const router: Router = inject(Router);
    const authService = inject(AuthService);
    const token = authService?.accessToken;
    if (token) {
        const tokenPayload: UserPayload = jwtDecode(token);
        if (tokenPayload) {
            return of(true);
        }
    }
    // Not Allow the access
    return of(router.parseUrl('/auth/sign-in'));
};
