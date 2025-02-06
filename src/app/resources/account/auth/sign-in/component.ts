// Core Angular
import { Component, OnDestroy, OnInit }                              from '@angular/core';
import { CommonModule }                                              from '@angular/common';
import { HttpClient }                                                from '@angular/common/http';
import { Router, RouterModule }                                      from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize, takeUntil } from 'rxjs';
import { UnsubscribeClass } from 'app/core/class/unsubscribe.class';
import { GoogleAuthService } from 'app/core/auth/google.service';
import { CommonModule } from '@angular/common';
import { ParticipantService } from 'app/core/user/participant.service';
import { GamesService } from 'app/resources/games/game.service';
import { ErrorHandleService } from 'app/helper/error-handle.service';
import { SnackbarService } from 'app/helper/snack-bar.service';
import GlobalConstants from 'app/helper/constants';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector    : 'auth-sign-in',
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

export class AuthSignInComponent extends UnsubscribeClass implements OnInit, OnDestroy {

    game_session_pin : string = '';
    form             : any;
    isLoading        : boolean = false;
    showBanner       : boolean = true;
    private _service: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        private http: HttpClient,
        private googleAuthService: GoogleAuthService,
        private formBuilder: FormBuilder,
        private _gameService: GamesService,
        private _participantService: ParticipantService,
        private _router: Router,
        private _snackbarService: SnackbarService,
        private _errorHandleService: ErrorHandleService,
        private _userService: UserService,
    ) {
        super();
    }

    ngOnInit() {
        this.FormBuilder();

        this.googleAuthService.loadGoogleScript()
            .then(() => {
                this.googleAuthService.initializeGoogleSignIn(this.handleGoogleSignIn.bind(this));
            })
            .catch((error) => {
                console.error('Failed to load Google SDK:', error);
            });
    }


    FormBuilder() {
        this.form = this.formBuilder.group({
            email    : ['', [Validators.required, Validators.email]],
            password : ['',  Validators.required],
        });
    }

    onLogin() {

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const { email, password } = this.form.value;

        this._service.login(email, password)
            .pipe(
                finalize(() => (this.isLoading = false)),
                takeUntil(this.unsubscribe$),
            )
            .subscribe({
                next: (res: any) => {
                    this._router.navigateByUrl('/home');
                    this._snackbarService.openSnackBar(res?.message || GlobalConstants.genericResponse, GlobalConstants.success);
                },
                error: (err: any) => {
                    this._errorHandleService.handleHttpError(err);
                },
            });
    }

    connect() {
    // this._gameService.connect();
        console.log('Connecting to room:', this.game_session_pin);

        this._gameService.joinRoom(this.game_session_pin).subscribe({
            next: (res) => {
                console.log('Room joined:', res);
                this._participantService.participant = {
                    room_id: this.game_session_pin,
                    room: res.room,
                    is_connected: true,
                    user_id: res.userId,
                };
                this._router.navigateByUrl(`${res.room.game}`);
            },
            error: (err) => {
                console.error('Failed to join room:', err);
            }
        });
    }

    handleGoogleSignIn(response: any): void {
        const idToken = response.credential;

        // Send the Google ID token to the backend for verification
        this.http.post('http://localhost:5000/api/auth/verify-google', { token_id: idToken }).subscribe(
        (res: any) => {

            this._userService.user = res.user;
            this.authService.accessToken = res.token;

            // window.location.reload();
            window.location.href = '/home';

            this._snackbarService.openSnackBar(res?.message || GlobalConstants.genericResponse, GlobalConstants.success);
        },
        (err: any) => {
            console.error('Login failed:', err);
        }
        );
    }

    closeBanner() {
        this.showBanner = false;
    }
}
