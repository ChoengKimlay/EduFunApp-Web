import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/core/user/user.service";
import { UserPayload } from "helper/interfaces/payload.interface";
import { AuthService } from "./core/auth/auth.service";
import { jwtDecode } from "jwt-decode";

export const initialDataResolver = () => {
    const router = inject(Router);
    const token = inject(AuthService).accessToken;

    const tokenPayload: UserPayload = jwtDecode(token);
    const user = inject(UserService).user = tokenPayload;

    if (!user) {
        localStorage.clear();
        return router.navigateByUrl('');
    }

    return true;
};
