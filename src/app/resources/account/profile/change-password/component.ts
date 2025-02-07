import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'app/helper/snack-bar.service';
import { ProfileService } from '../service';
import { ErrorHandleService } from 'app/helper/error-handle.service';
import { PasswordReq } from '../interface';
import GlobalConstants from 'app/helper/constants';
import { passwordMatchValidator }                                    from 'app/helper/password-match.validator';

@Component({
    selector    : 'profile-change-password',
    standalone  : true,
    templateUrl : './template.html',
    styleUrl    : './style.scss',
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ]
})

export class ChangePasswordComponent implements OnInit {

    public form      : any;
    public isLoading : boolean = false;

    constructor(
        private _dialogRef: MatDialogRef<ChangePasswordComponent>,

        private _formBuilder        : UntypedFormBuilder,
        private _snackBarService    : SnackbarService,
        private _service            : ProfileService,
        private _errorHandleService :  ErrorHandleService
    ) { }

    ngOnInit(): void {

        this.ngBuilderForm();
    }

    ngBuilderForm(): void {
        this.form = this._formBuilder.group({
            password         : [null, [Validators.required]],
            confirm_password : [null, [Validators.required]],
        }, { validators: passwordMatchValidator });
    }

    submit(): void {

        if (this.form.invalid) {
            return;
        }

        this.form.disable();

        const body: PasswordReq = {
            password         : this.form.value.password,
            confirm_password : this.form.value.confirm_password
        };

        this._service.updatePassword(body).subscribe({
            next: response => {

                this.form.enable();

                this._snackBarService.openSnackBar(response.message, GlobalConstants.success);

                this._dialogRef.close()
            },
            error: (err: HttpErrorResponse) => {

                this._errorHandleService.handleHttpError(err);

                this.form.enable();
            }
        });
    }
}
