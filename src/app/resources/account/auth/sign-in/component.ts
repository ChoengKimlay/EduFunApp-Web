import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize, takeUntil } from 'rxjs';
import { UnsubcribeClass } from 'app/core/class/unsubcribe.class';

@Component({
    selector: 'auth-sign-in',
    standalone: true,
    templateUrl: 'template.html',
    styleUrl: 'style.scss',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatCheckboxModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})

export class AuthSignInComponent extends UnsubcribeClass implements OnInit, OnDestroy {

    form: any = {
        email: null,
        password: null
    }
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private http: HttpClient,

    ) {
        super();
    }

    ngOnInit() {}

    onLogin() {
        const body = this.form.value;

        this.authService.login(body.email, body.password)
        .pipe(
            finalize(() => (this.isLoading = false)),
            takeUntil(this.unsubscribe$),
        )
        .subscribe({
            next: (res) => {
                console.log(res)
                this.router.navigate(['/app/dashboard']);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    handleGoogleSignIn(response: any): void {
        const idToken = response.credential;

        // Send the Google ID token to the backend for verification
        this.http.post('http://localhost:3000/api/auth/verify-google', { idToken }).subscribe(
        (res: any) => {
            console.log('Login successful:', res);
            // Handle success (e.g., save token, redirect user)
            this.router.navigate(['/app/dashboard'])
        },
        (err: any) => {
            console.error('Login failed:', err);
        }
        );
    }
}
