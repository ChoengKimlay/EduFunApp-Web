import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParticipantService } from 'app/core/user/participant.service';
import { GamesService } from '../game.service';
import { Socket } from 'socket.io-client';
import { takeUntil } from 'rxjs';
import { UnsubcribeClass } from 'app/core/class/unsubcribe.class';
import { Participant } from 'app/core/user/participant.type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'wordcloud',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    standalone: true,
    styleUrls: ['../../landing/style.scss'],
})

export class WordCloudComponent extends UnsubcribeClass implements OnInit, OnDestroy {

    socket: Socket = null!;
    participant: Participant = null!;
    message: string = '';
    isHoster: boolean = false;
    messages: string[] = [];

    constructor(
        private _participantService: ParticipantService,
        private _gameService: GamesService,
    ) { super() }

    ngOnInit() {
        this._gameService.getSocket().pipe(
            takeUntil(this.unsubscribe$),
        ).subscribe(socket => this.socket = socket);

        this._participantService.participant$.subscribe(participant => {
            this.participant = participant

            //check if the user is the host so that they can display the wordcloud for everyone to see while the partipant only send message
            if(this.participant.user_id === this.participant.room.users[0]) this.isHoster = true;

            if(this.isHoster){
                this._gameService.onEvent<string>('wordcloud/recieved-message').subscribe( data => {
                    this.messages.push(data);
                })
            }
        });
    }

    sendMessage(){
        this._gameService.emitEvent('wordcloud/send-message', {
            message: this.message,
            roomId: this.participant.room_id,
        });
    }
}