import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { jwtDecode } from "jwt-decode"
import { AuthService } from 'app/core/auth/auth.service';
import { UserPayload } from 'helper/interfaces/payload.interface';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (_route, _state) => {

    const router: Router = inject(Router);
    const authService = inject(AuthService);
    const token = authService?.accessToken;
    if (token) {
        const tokenPayload: UserPayload = jwtDecode(token);
        if (tokenPayload) {
            return of(router.parseUrl('/dashboard'));
        }
    }
    // Allow the access
    return of(true);
};
