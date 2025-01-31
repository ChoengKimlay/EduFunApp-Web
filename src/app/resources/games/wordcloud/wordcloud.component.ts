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
    question: string = '';

    constructor(
        private _participantService: ParticipantService,
        private _gameService: GamesService,
    ) { super() }

    ngOnInit() {
         console.log('Initializing WordCloudComponent...');

        // Ensure the socket is connected
        this._gameService.connect();

        // Subscribe to participant data
        this._participantService.participant$.subscribe(participant => {
            if (participant) {
                console.log('Participant data:', participant);
                this.participant = participant;

                // Check if the user is the host
                if (this.participant.user_id === this.participant.room.users[0]) {
                    this.isHoster = true;
                    console.log('User is the host.');
                }

                // Ensure the room is joined before setting up listeners
                this._gameService.joinRoom(this.participant.room_id).subscribe({
                    next: (res) => {
                        console.log('Room joined:', res);
                        this.setupSocketListeners(); // Set up listeners after joining the room
                    },
                    error: (err) => {
                        console.error('Failed to join room:', err);
                    }
                });
            }
        });
    }

    setupSocketListeners() {
        console.log('Setting up socket listeners...');

        this._gameService.onEvent('wordcloud/received-message').subscribe((res: any) => {
                console.log('Received message:', res.message);
                this.messages.push(res.message);
            });

        this._gameService.onEvent('wordcloud/received-question').subscribe((res: any) => {
            console.log('Received question:', res.message);
            this.question = res.message;
        });
    }

    sendMessage() {
        if (this.message.trim()) {
            console.log('Sending message:', this.message);
            this._gameService.emitEvent('wordcloud/send-message', {
                message: this.message,
                roomId: this.participant.room_id,
            });
            this.message = ''; // Clear the input after sending the message
        }
    }
}