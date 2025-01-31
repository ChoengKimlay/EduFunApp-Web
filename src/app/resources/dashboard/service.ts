import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../env/env';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) {}

    getDashboard(): Observable<any> {
        return this.http.get<any>(`${env.api}/auth/login`);
    }
}

