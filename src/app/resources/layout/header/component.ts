import { Component, NgZone, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { GamesService } from 'app/resources/games/game.service';
import { ParticipantService } from 'app/core/user/participant.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: 'template.html',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
    ],
})

export class HeaderComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private router: Router, private zone: NgZone,
        private _gameservie: GamesService,
        private _participantService: ParticipantService,
    ) { }

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

    logout() {
        this._authService.logout();
        this.router.navigate(['/auth/sign-in']);
        window.location.reload();
    }

    createRoom(){
        console.log('create room')
        this._gameservie.createRoom().subscribe(res => {
            this._participantService.participant = {
                room_id: res,
                room: {
                    game: 'wordcloud',
                    users: [],
                },
                is_connected: true,
                user_id: res?.userId,
            };
            this.router.navigateByUrl(`/wordcloud`);
        });
    }

}
