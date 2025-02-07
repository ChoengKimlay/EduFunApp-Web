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
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'wordcloud',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TagCloudComponent,
    ],
    standalone: true,
    styleUrl: 'style.scss',
})
export class WordCloudComponent implements OnInit {

    participant: Participant = {
        room_id: '------',
        user_id: '',
        room: {
            game: '',
            users: [],
        }
    };
    isEditQuestion: boolean = false;
    message: string = '';
    isHoster: boolean = false;
    messages$ = new BehaviorSubject<string[]>([]); // Reactive message list
    question: string = '';
    public data: CloudData[] = [
        { text: 'gaming', weight: 2, color: '#f59e0b' },
        { text: 'i love you', weight: 2, color: '#2563eb' },
        { text: 'good morning', weight: 4, color: '#4b5563' },
        { text: 'have fun', weight: 2, color: '#9ca3af' },
        { text: 'good night', weight: 4, color: '#db2777' },
        { text: 'Valorant', weight: 3, color: '#f43f5e' },
    ];
    public options: CloudOptions = {
        width: 800,
        height: 400,
        overflow: true,
        strict: true,
        randomizeAngle: true,
    };

    total_user: number = 0;

    tailwindColors: string[] = [
        "#fb7185", "#f43f5e", "#e11d48", // Red shades (400 to 600)
        "#f59e0b", "#d97706", "#b45309", // Yellow shades (400 to 600)
        "#10b981", "#059669", "#047857", // Green shades (400 to 600)
        "#2563eb", "#1d4ed8", "#1e40af",   // Blue shades (400 to 600)
        "#4f46e5", "#4338ca", "#3730a3",  // Indigo shades (400 to 600)
        "#9333ea", "#7e22ce", "#6b21a8",  // Purple shades (400 to 600)
        "#db2777", "#be185d", "#9d174d",   // Pink shades (400 to 600)
        "#9ca3af", "#6b7280", "#4b5563",  // Gray shades (400 to 600)
    ]
    constructor(
        private _participantService: ParticipantService,
        private _gameService: GamesService,
        private _userService: UserService,
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
                        if(res?.room?.gameDetail?.hoster === this._userService.user?.id){ 
                            this.isHoster = true;
                        }
                        this.total_user = res.room.users.length;
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

        this._gameService.onEvent<{message: string}>('room/user').subscribe((res: any) => {
            this.total_user = res.length;
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
            weight: weight + 1,
            color: this.getRandomColor()
        }));
    }

    getRandomColor(): string {
        return this.tailwindColors[Math.floor(Math.random() * this.tailwindColors.length)];
    }
}
