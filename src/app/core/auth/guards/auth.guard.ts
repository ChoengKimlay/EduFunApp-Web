import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const isAuthenticated = true;
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
