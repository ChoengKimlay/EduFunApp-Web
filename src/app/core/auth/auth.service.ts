import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { env } from '../../../env/env';
import { Router } from '@angular/router';
import { UserService }          from "app/core/user/user.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(
        private http: HttpClient,
        private userService: UserService,
    ) {
        // Check if the localStorage has a 'currentUser' and parse it if not null
        const currentUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(
            currentUser ? JSON.parse(currentUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

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

    // Getter to access the current user value
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    // Login method, replace with your backend API
    login(email: string, password: string) {
        return this.http
            .post<any>(`${env.api}/auth/login`, { email, password })
            .pipe(
                map((res) => {

                    this.accessToken = res.token;

                    // Store user details and JWT token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(res.user)
                    );

                    this.currentUserSubject.next(res.user);

                    return res;
                })
            );
    }

    // Logout method
    logout() {

        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');

        this.currentUserSubject.next(null);
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
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(response.user)
                );
                this.currentUserSubject.next(response.user);

                this.accessToken = response.token;

                return of(response); // Return a new observable with the response
            }),
        );
    }

    // Check if the user is authenticated
    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    // Check if the user has a specific role
    hasRole(role: string): boolean {
        const user = this.currentUserSubject.value;
        return user && user.roles && user.roles.includes(role);
    }
}
