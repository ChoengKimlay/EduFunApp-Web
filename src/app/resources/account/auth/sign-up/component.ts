import { Component, OnDestroy, OnInit }                              from '@angular/core';
import { MatButtonModule }                                           from '@angular/material/button';
import { MatFormFieldModule }                                        from '@angular/material/form-field';
import { MatInputModule }                                            from '@angular/material/input';
import { MatIconModule }                                             from '@angular/material/icon';
import { Router, RouterModule }                                      from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule }                                         from '@angular/material/checkbox';
import { MatCardModule }                                             from '@angular/material/card';
import { AuthService }                                               from 'app/core/auth/auth.service';
import { HttpClient }                                                from '@angular/common/http';
import { finalize, takeUntil }                                       from 'rxjs';
import { UnsubscribeClass }                                          from 'app/core/class/unsubscribe.class';
import { GoogleAuthService }                                         from 'app/core/auth/google.service';
import { CommonModule }                                              from '@angular/common';
import { ErrorHandleService }                                        from 'app/helper/error-handle.service';
import { SnackbarService }                                           from 'app/helper/snack-bar.service';
import GlobalConstants                                               from 'app/helper/constants';
import { passwordMatchValidator } from 'app/helper/password-match.validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthOTPComponent } from '../otp';

@Component({
    selector    : 'auth-sign-up',
    standalone  : true,
    templateUrl : 'template.html',
    styleUrl    : 'style.scss',
    imports     : [
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
        MatProgressSpinnerModule,
        AuthOTPComponent,
    ],
})

export class AuthSignUpComponent extends UnsubscribeClass implements OnInit, OnDestroy {


    form: any;
    isLoading: boolean = false;
    isOTP: boolean = false;
    showBanner: boolean = true;
    email: string = '';

    constructor(
        private _authService         : AuthService,
        private _formBuilder         : FormBuilder,
        private _snackbarService    : SnackbarService,
        private _errorHandleService : ErrorHandleService,
    ) {
        super();
    }

    ngOnInit() {
        this.FormBuilder();
    }

    FormBuilder() {
        this.form = this._formBuilder.group(
            {
                username         : ['choeng kimlay', [Validators.required]],
                email            : ['mingfongmen@gmail.com', [Validators.required, Validators.email]],
                password         : ['123456', Validators.required],
                confirm_password : ['123456', Validators.required],
            },
            { validators: passwordMatchValidator() } // Custom validator for matching passwords
        );
    }

    onSignUp() {
        // Check if form is invalid and mark all fields as touched
        if (this.form.invalid) {
            this.form.markAllAsTouched();

            // Show specific error messages based on form validation
            if (this.form.get('confirm_password')?.hasError('passwordMismatch')) {
                this._snackbarService.openSnackBar("Confirm password does not match password", GlobalConstants.error);
            } else {
                this._snackbarService.openSnackBar("Please fill all required fields correctly", GlobalConstants.error);
            }
            return;
        }

        const { email } = this.form.value;
        const credentials = { email: email };
        this.email = this.form.value.email

        this.isLoading = true;

        // Sign up the user
        this._authService.signUp(this.form.value).pipe(
            finalize(() => { this.isLoading = false; }),
            takeUntil(this.unsubscribe$),
        ).subscribe({
            next: (res) => {

                this.isOTP = true;

                // Send OTP after successful sign-up or if user already exist
                this._authService.sendOtp(credentials).pipe(
                    finalize(() => { this.isLoading = false; }),
                    takeUntil(this.unsubscribe$),
                ).subscribe({
                    next: (otpRes) => {

                        this._snackbarService.openSnackBar(otpRes?.message || GlobalConstants.genericResponse, GlobalConstants.success);

                    },
                    error: (otpErr) => {

                        // Handle error during OTP sending
                        this._errorHandleService.handleHttpError(otpErr);

                    },
                });

            },
            error: (err) => {

                // Handle error during sign-up process
                this._errorHandleService.handleHttpError(err);
                this.isLoading = false; // Reset loading state if sign-up fails

            },
        });
    }
}
