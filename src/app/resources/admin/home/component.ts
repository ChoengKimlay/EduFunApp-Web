import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/component';
import { HeaderComponent } from '../../layout/header/component';
import { CommonModule, NgStyle } from '@angular/common';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs';
import { UnsubscribeClass } from 'app/core/class/unsubscribe.class';
import { GamesService } from 'app/resources/games/game.service';
import { ParticipantService } from 'app/core/user/participant.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'home-page',
    standalone: true,
    templateUrl: 'template.html',
    styleUrls: ['component.scss'],
    imports: [
        CommonModule,
        MatIconModule
    ],
})

export class HomePageComponent extends UnsubscribeClass implements OnInit, OnDestroy {
    roomid: string = '';

    isSidebarOpen = false;
    user: User | null = null;
    selectedGame: string = '';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _gameservie: GamesService,
        private _participantService: ParticipantService,
        private router: Router,
        
    ) {
        super();
    }

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
        // Subscribe to user changes
        this._userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
            this.user = user;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    createRoom(){
        console.log('create room')
        this._gameservie.createRoom().subscribe(res => {
            this.roomid = res;
            console.log(this.roomid)
            
            this._gameservie.joinRoom(this.roomid).subscribe(res => {
                console.log('Room joined:', res);
                this._participantService.participant = {
                    room_id: this.roomid,
                    room: res.room,
                    is_connected: true,
                    user_id: res.userId,
                };
                console.log(res.room.game)
                this.router.navigateByUrl(`/${res.room.game.trim()}`);
            });
        });

        
    }
}
