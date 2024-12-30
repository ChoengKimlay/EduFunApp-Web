import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Check if the localStorage has a 'currentUser' and parse it if not null
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getter to access the current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login method, replace with your backend API
  login(email: string, password: string) {
    return this.http.post<any>(`/api/login`, { email, password })
      .pipe(map(user => {
        // Store user details and JWT token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  // Logout method
  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
