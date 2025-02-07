import { CommonModule }                                                     from '@angular/common';
import { Component, Inject, Input }                                         from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule }                                                  from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef }                   from '@angular/material/dialog';
import { MatFormFieldModule }                                               from '@angular/material/form-field';
import { MatIcon, MatIconModule }                                           from '@angular/material/icon';
import { MatInputModule }                                                   from '@angular/material/input';
import { User }                                                             from 'app/core/user/user.types';
import { ProfileUpdateRes }                                                 from '../interface';
import { HttpErrorResponse }                                                from '@angular/common/http';
import GlobalConstants                                                      from 'app/helper/constants';
import { ErrorHandleService }                                               from 'app/helper/error-handle.service';
import { SnackbarService }                                                  from 'app/helper/snack-bar.service';
import { ProfileService }                                                   from '../service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector    : 'update-form',
    standalone  : true,
    templateUrl : './template.html',
    styleUrl    : './style.scss',
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIcon,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatProgressSpinner
    ],
})
export class UpdateProfileDialogComponent {

    public form      : any;
    public isLoading : boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: User,

        private _dialogRef          : MatDialogRef<UpdateProfileDialogComponent>,
        private _formBuilder        : UntypedFormBuilder,
        private _accountService     : ProfileService,
        private _snackBarService    : SnackbarService,
        private _errorHandleService : ErrorHandleService,
    ) { }

    ngOnInit(): void {
        this.ngBuilderForm();
    }

    ngBuilderForm(): void {
        this.form = this._formBuilder.group({
            username : [this.data?.username,  Validators.required],
            email    : [this.data?.email,    [Validators.required, Validators.email]],
        });
    }

    submit(): void {

        this.isLoading = true;

        this._accountService.profile(this.form.value).subscribe({
            next: (res: ProfileUpdateRes) => {

                if (res.token) {

                    localStorage.removeItem('accessToken');

                    localStorage.setItem('accessToken', res.token);
                }

                window.location.reload();

                this._snackBarService.openSnackBar(res.message, GlobalConstants.success);

                this._dialogRef.close();
            },
            error: (err: HttpErrorResponse) => {

                this._errorHandleService.handleHttpError(err);

                this.form.enable();
            },
        });
    }
}
