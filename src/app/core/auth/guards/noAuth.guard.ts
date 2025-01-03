import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })

export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const requiredRole = next.data['role'] as string;
        return this.authService.hasRole(requiredRole);
    }
}
