import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize, takeUntil } from 'rxjs';
import { UnsubcribeClass } from 'app/core/class/unsubcribe.class';
import { GoogleAuthService } from 'app/core/auth/google.service';
import { CommonModule } from '@angular/common';

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
        CommonModule,
    ],
})

export class AuthSignInComponent extends UnsubcribeClass implements OnInit, OnDestroy {

    form: any;
    isLoading: boolean = false;
    showBanner: boolean = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private http: HttpClient,
        private googleAuthService: GoogleAuthService,
        private formBuilder: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
        this.FormBuilder();
        // this.googleAuthService.loadGoogleScript();
        // this.googleAuthService.initializeGoogleSignIn(this.handleGoogleSignIn.bind(this));
    }

    FormBuilder() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onLogin() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const { email, password } = this.form.value;

        this.authService.login(email, password)
            .pipe(
                finalize(() => (this.isLoading = false)),
                takeUntil(this.unsubscribe$),
            )
            .subscribe({
                next: (res) => {
                    this.router.navigate(['dashboard']);
                },
                error: (err) => {
                    console.error('Login error:', err);
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
            this.router.navigate(['dashboard'])
        },
        (err: any) => {
            console.error('Login failed:', err);
        }
        );
    }

    closeBaneer() {
        this.showBanner = false;
    }
}
