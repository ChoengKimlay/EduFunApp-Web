import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParticipantService } from 'app/core/user/participant.service';
import { GamesService } from '../game.service';
import { Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Participant } from 'app/core/user/participant.type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { TagCloudComponent } from 'angular-tag-cloud-module';

@Component({
    selector: 'wordcloud',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TagCloudComponent
    ],
    standalone: true,
    styleUrls: ['../../landing/style.scss'],
})
export class WordCloudComponent implements OnInit {
    socket: Socket = null!;
    participant: Participant = null!;
    message: string = '';
    isHoster: boolean = false;
    messages$ = new BehaviorSubject<string[]>([]); // Reactive message list
    question: string = '';
    data: CloudData[] = [];
    options: CloudOptions = {
        width: 1000,
        height: 400,
        overflow: false,
    };

    tailwindColors: string[] = [
        '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', // Red 100-400
        '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', // Yellow 100-400
        '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', // Green 100-400
        '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', // Blue 100-400
        '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', // Indigo 100-400
        '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', // Purple 100-400
        '#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', // Violet 100-400
    ];
    constructor(
        private _participantService: ParticipantService,
        private _gameService: GamesService,
    ) {  }

    ngOnInit() {
        console.log('Initializing WordCloudComponent...');
        this._gameService.connect();

        this._participantService.participant$.subscribe(participant => {
            if (participant) {
                console.log('Participant data:', participant);
                this.participant = participant;
                if (this.participant.user_id === this.participant.room.users[0]) {
                    this.isHoster = true;
                    console.log('User is the host.');
                }

                this._gameService.joinRoom(this.participant.room_id).subscribe({
                    next: (res) => {
                        console.log('Room joined:', res);
                        this.setupSocketListeners();
                    },
                    error: (err) => {
                        console.error('Failed to join room:', err);
                    }
                });
            }
        });

        // Subscribe to messages$ and update the word cloud whenever messages change
        this.messages$.subscribe(() => {
            this.updateWordCloud();
        });
    }

    setupSocketListeners() {
        console.log('Setting up socket listeners...');
        this._gameService.onEvent<{message: string}>('wordcloud/recieved-message').subscribe((res: any) => {
            console.log('Received message:', res);
            this.messages$.next([...this.messages$.value, res.message]);
        });

        this._gameService.onEvent<{message: string}>('wordcloud/recieved-question').subscribe((res: any) => {
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
            this.message = '';
        }
    }

    updateWordCloud() {
        const messageCountMap = new Map<string, number>();

        this.messages$.value.forEach(message => {
            messageCountMap.set(message, (messageCountMap.get(message) || 0) + 1);
        });

        this.data = Array.from(messageCountMap.entries()).map(([text, weight]) => ({
            text,
            weight,
            color: this.getRandomColor()
        }));
    }

    getRandomColor(): string {
        return this.tailwindColors[Math.floor(Math.random() * this.tailwindColors.length)];
    }
}
