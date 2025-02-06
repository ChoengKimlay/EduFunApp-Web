// Core Angular
import { Component, OnDestroy, OnInit }                              from '@angular/core';
import { CommonModule }                                              from '@angular/common';
import { RouterModule }                                              from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Material
import { MatButtonModule }                                           from '@angular/material/button';
import { MatCardModule }                                             from '@angular/material/card';
import { MatCheckboxModule }                                         from '@angular/material/checkbox';
import { MatFormFieldModule }                                        from '@angular/material/form-field';
import { MatIconModule }                                             from '@angular/material/icon';
import { MatInputModule }                                            from '@angular/material/input';
import { MatProgressSpinnerModule }                                  from '@angular/material/progress-spinner';

// RxJS
import { finalize, takeUntil }                                       from 'rxjs';

// Core
import { AuthService }                                               from 'app/core/auth/auth.service';
import { UnsubscribeClass }                                          from 'app/core/class/unsubscribe.class';

// Helper
import { ErrorHandleService }                                        from 'app/helper/error-handle.service';
import { SnackbarService }                                           from 'app/helper/snack-bar.service';
import GlobalConstants                                               from 'app/helper/constants';
import { passwordMatchValidator }                                    from 'app/helper/password-match.validator';

// Local
import { AuthOTPComponent }                                          from '../otp';

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

    form       : any;
    isLoading  : boolean = false;
    isOTP      : boolean = false;
    email      : string = '';

    constructor(
        private _authService        : AuthService,
        private _formBuilder        : FormBuilder,
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
                username         : ['', [Validators.required]],
                email            : ['', [Validators.required, Validators.email]],
                password         : ['', Validators.required],
                confirm_password : ['', Validators.required],
            },
            { validators: passwordMatchValidator() }
        );
    }

    onSignUp() {

        if (this.form.invalid) {
            this.form.markAllAsTouched();

            if (this.form.get('confirm_password')?.hasError('passwordMismatch')) {
                this._snackbarService.openSnackBar("Confirm password does not match password", GlobalConstants.error);
            } else {
                this._snackbarService.openSnackBar("Please fill all required fields correctly", GlobalConstants.error);
            }
            return;
        }

        const credentials = { email: this.form.value.email };
        this.email = this.form.value.email

        this.isLoading = true;

        // Sign up the user
        this._authService.signUp(this.form.value).pipe(
            finalize(() => { this.isLoading = false; }),
            takeUntil(this.unsubscribe$),
        ).subscribe({
            next: (res) => {

                // Send OTP after successful sign-up or if user already exist
                this._authService.sendOtp(credentials).pipe(
                    finalize(() => { this.isLoading = false; }),
                    takeUntil(this.unsubscribe$),
                ).subscribe({
                    next: (otpRes) => {

                        this.isOTP = true;
                        this._snackbarService.openSnackBar(otpRes?.message || GlobalConstants.genericResponse, GlobalConstants.success);

                    },
                    error: (otpErr) => {

                        this._errorHandleService.handleHttpError(otpErr);

                    },
                });

            },
            error: (err) => {

                this._errorHandleService.handleHttpError(err);
                this.isLoading = false;

            },
        });
    }
}
