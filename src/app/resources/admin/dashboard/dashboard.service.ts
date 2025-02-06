import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'env/env';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DashboardService {
    headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    constructor(private httpClient: HttpClient) { }
    

    getSessions(id: number): Observable<any> {
        return this.httpClient.get(`${env.api}/user/session/${id}`,{ headers: this.headers });
    }
}