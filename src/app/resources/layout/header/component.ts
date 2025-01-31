import { Component, NgZone, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
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
        MatMenuModule
    ],
})

export class HeaderComponent implements OnInit {

    constructor(
        private authService: AuthService, private router: Router, private zone: NgZone,
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
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.zone.run(() => {
            this.router.navigate(['/auth/sign-in']).then(success => {
                if (!success) {
                    console.log('Redirect failed');
                } else {
                    console.log('Redirect successful');
                }
            }).catch(err => {
                console.error('Error during navigation:', err);
            });
        });
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
