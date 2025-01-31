import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

export const NoAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);

    if (inject(AuthService).isAuthenticated()) {
        router.navigateByUrl('/dashboard');
        return false;
    }

    return true;
};
