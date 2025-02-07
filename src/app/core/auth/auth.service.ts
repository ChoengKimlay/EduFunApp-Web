import { inject, Injectable }              from '@angular/core';
import { HttpClient }                      from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap }                  from 'rxjs/operators';
import { env }                             from '../../../env/env';
import { UserService }                     from "app/core/user/user.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }


    // Login method, replace with your backend API
    login(email: string, password: string) {
        return this.http
            .post<any>(`${env.api}/auth/login`, { email, password })
            .pipe(
                map((res) => {

                    this.accessToken = res.token;

                    return res;
                })
            );
    }

    // Logout method
    logout() {

        localStorage.removeItem('accessToken');

        return of(true);
    }

    signUp(signup: { username: string; email: string; password: string; }): Observable<{status: boolean, message: string}> {
        return this.http
            .post<{status: boolean, message: string}>(`${env.api}/auth/register`, signup)
            .pipe(
            switchMap((response: {status: boolean, message: string}) => {
                return of(response); // Return the response as a new observable
            }),
        );
    }

    sendOtp(credentials: { email: string }): Observable<{ status: boolean; message: string }> {
        return this.http
            .post<{ status: boolean; message: string }>(
                `${env.api}/auth/send-otp`,
                credentials
            )
            .pipe(
                switchMap((response) => of(response))
            );
    }

    verifyOtp(credentials: { email: string; otp: string }): Observable<any> {
        const { email, otp } = credentials;

        const requestBody = {
            email,
            otp,
        };
        return this.http.post<any>(`${env.api}/auth/verify-otp`, requestBody).pipe(
            switchMap((response: any) => {

                this.accessToken = response.token;

                return of(response); // Return a new observable with the response
            }),
        );
    }

    verifyResetOtp(credentials: { email: string; otp: string }): Observable<any> {
        const { email, otp } = credentials;

        const requestBody = {
            email,
            otp,
        };

        return this.http.post<any>(`${env.api}/auth/verify-reset-otp`, requestBody)
    }

    resetPassword(credentials: { email: string; password: string }): Observable<any> {
        const { email, password } = credentials;

        const requestBody = {
            email,
            password,
        };

        return this.http.post<any>(`${env.api}/auth/reset-password`, requestBody)
    }
}
