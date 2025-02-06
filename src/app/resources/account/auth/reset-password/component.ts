import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from 'app/core/auth/auth.service';
import { UnsubscribeClass } from 'app/core/class/unsubscribe.class';
import GlobalConstants from 'app/helper/constants';
import { ErrorHandleService } from 'app/helper/error-handle.service';
import { SnackbarService } from 'app/helper/snack-bar.service';
import { finalize, takeUntil } from 'rxjs';
import { AuthResetOTPComponent } from '../reset-otp';
import { passwordMatchValidator }                                    from 'app/helper/password-match.validator';

@Component({
    selector    : 'forgot-password',
    templateUrl : 'template.html',
    standalone  : true,
    imports     : [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        AuthResetOTPComponent,
    ],
})

export class ForgotPasswordComponent extends UnsubscribeClass implements OnInit, OnDestroy {

    form       : any;
    resetForm  : any;
    isLoading  : boolean = false;
    isOTP      : boolean = false;
    isVerified : boolean = false;
    email      : string = '';

    constructor(
        private _authService        : AuthService,
        private _formBuilder        : FormBuilder,
        private _snackbarService    : SnackbarService,
        private _errorHandleService : ErrorHandleService,
        private _router             : Router
    ) {
        super();
    }


    ngOnInit() {
        this.FormBuilder();
    }

    FormBuilder() {

        this.form = this._formBuilder.group(
            {
                email : ['', [Validators.required, Validators.email]],
            },
        );

        this.resetForm = this._formBuilder.group(
            {
                password         : ['', Validators.required],
                confirm_password : ['', Validators.required],
            },
            { validators: passwordMatchValidator() }
        );
    }

    onResetOTP() {

        // Check if form is invalid and mark all fields as touched
        if (this.form.invalid) {
            this.form.markAllAsTouched();
        }

        this.email = this.form.value.email
        const credentials = { email: this.email };

        this.isLoading = true;

        this._authService.sendOtp(credentials).pipe(
            finalize(() => { this.isLoading = false; }),
            takeUntil(this.unsubscribe$),
        ).subscribe({
            next: (res) => {

                this.isOTP = true;
                this._snackbarService.openSnackBar(res?.message || GlobalConstants.genericResponse, GlobalConstants.success);

            },
            error: (err) => {

                // Handle error during OTP sending
                this._errorHandleService.handleHttpError(err);

            },
        });
    }

    otpIsVerified(verify: boolean) {
        if (verify) {
            this.isOTP = false;
            this.isVerified = true;
        }
    }

    onResetPassword() {

        if (this.resetForm.invalid) {
            this.resetForm.markAllAsTouched();

            if (this.resetForm.get('confirm_password')?.hasError('passwordMismatch')) {
                this._snackbarService.openSnackBar("Confirm password does not match password", GlobalConstants.error);
            } else {
                this._snackbarService.openSnackBar("Please fill all required fields correctly", GlobalConstants.error);
            }
            return;
        }

        this.isLoading = true;

        const credentials = { email: this.email, password: this.resetForm.value.password };

        this._authService.resetPassword(credentials).pipe(
            finalize(() => { this.isLoading = false; }),
            takeUntil(this.unsubscribe$),
        ).subscribe({
            next: (res) => {

                this._router.navigate(['/auth/sign-in']);
                this._snackbarService.openSnackBar(res?.message || GlobalConstants.genericResponse, GlobalConstants.success);

            },
            error: (err) => {

                this._errorHandleService.handleHttpError(err);

            },
        });
    }
}
