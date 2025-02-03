import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ParticipantService } from 'app/core/user/participant.service';
import { GamesService } from '../games/game.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from 'app/helper/snack-bar.service';

@Component({
    selector: 'landing-page',
    templateUrl: 'template.html',
    styleUrl: 'style.scss',
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule
    ],
})

export class LandingComponent implements OnInit {

    game_session_pin: string = '';

    constructor(
        private _participantService: ParticipantService,
        private _gameService: GamesService,
        private _router: Router,
        private _snackbarService: SnackbarService,
    ) {}

    ngOnInit() {
        this._participantService.participant = {
            room_id: '',
            user_id: '',
            room: {
                game: '',
                users: [],
            },
            is_connected: false,
        };
    }

    connect() {
    // this._gameService.connect();
        console.log('Connecting to room:', this.game_session_pin);

        this._gameService.joinRoom(this.game_session_pin).subscribe({
            next: (res) => {
                if(!res.room){
                    this._snackbarService.openSnackBar('Room not found', 'error');
                    return;
                }
                console.log('Room joined:', res);
                this._participantService.participant = {
                    room_id: this.game_session_pin,
                    room: res.room,
                    is_connected: true,
                    user_id: res.userId,
                };
                this._router.navigateByUrl(`${res.room.game.trim()}`);
            },
            error: (err) => {
                this._snackbarService.openSnackBar('Room not found', 'error');
            }
        });
    }
}
