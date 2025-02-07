import { ChangeDetectorRef, Component, OnDestroy, OnInit }           from '@angular/core';
import { CommonModule }                                              from '@angular/common';
import { Router, RouterModule }                                      from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule }                                           from '@angular/material/button';
import { MatFormFieldModule }                                        from '@angular/material/form-field';
import { MatInputModule }                                            from '@angular/material/input';
import { MatIconModule }                                             from '@angular/material/icon';
import { MatCheckboxModule }                                         from '@angular/material/checkbox';
import { MatCardModule }                                             from '@angular/material/card';
import { UnsubscribeClass }                                          from 'app/core/class/unsubscribe.class';
import { UserService }                                               from 'app/core/user/user.service';
import { User }                                                      from 'app/core/user/user.types';
import { MatDialog }                                                 from '@angular/material/dialog';
import { DialogConfigService }                                       from 'app/helper/dialog-config.service';
import { UpdateProfileDialogComponent }                              from './update/component';
import { ChangePasswordComponent }                                   from './change-password/component';

@Component({
    selector    : 'profile',
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
    ],
})

export class ProfilePageComponent extends UnsubscribeClass implements OnInit, OnDestroy {

    public user: User | undefined;

    constructor(
        private _userService       : UserService,
        private _changeDetectorRef : ChangeDetectorRef,
        private _dialog              : MatDialog,
        private _dialogConfigService : DialogConfigService
    ) {
        super();
    }

    ngOnInit() {
        this._userService.user$.subscribe((user: User) => {
            this.user = user;

            console.log(user)

            // Trigger change detection
            this._changeDetectorRef.markForCheck();
        });
    }

    updateProfile() {
        const dialogConfig = this._dialogConfigService.getDialogConfig(this.user)

        this._dialog.open(UpdateProfileDialogComponent, dialogConfig);
    }

    updatePassword() {

        const dialogConfig = this._dialogConfigService.getDialogConfig(this.user)

        this._dialog.open(ChangePasswordComponent, dialogConfig);
    }
}
