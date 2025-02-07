import { env } from './../../../../env/env';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { PasswordReq, ProfileUpdateReq, ProfileUpdateRes } from './interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    private readonly httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    // Update profile endpoint
    profile(body: ProfileUpdateReq): Observable<ProfileUpdateRes> {
        return this.http.put<ProfileUpdateRes>(`${env.api}/profile/update`, body, this.httpOptions);
    }

    // Update password endpoint
    updatePassword(body: PasswordReq): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${env.api}/profile/update-password`, body, this.httpOptions);
    }

}
