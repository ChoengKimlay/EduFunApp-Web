import { Injectable } from '@angular/core';
import { ParticipantService } from 'app/core/user/participant.service';
import { env } from 'env/env';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class GamesService {
    
    private socket: Socket = null!;
    private readonly SERVER_URL = env.ws;

    private socketSubject: BehaviorSubject<Socket> = new BehaviorSubject<Socket>(null!);
    
    constructor(
        private _participantService: ParticipantService,
    ) { }

    

    connect() {
        this.disconnect();
        this.socket = io(this.SERVER_URL);
        this.socketSubject.next(this.socket);
    }

    getSocket() {
        return this.socketSubject.asObservable();
    }

    joinRoom(roomId: string): Observable<{ room:{ game: string, users: string[] }, userId: string}> {
        return new Observable((observer) => {
            // Emit the 'join' event to the server with the room id
            this.socket.emit('room/join', { roomId });

            // Listen for the 'roomJoined' event from the server (only once)
            this.socket.once('room/data', (res: { room: { game: string, users: string[] }, userId: string}) => {
                // Once we receive the room ID, pass it to the observer
                observer.next(res);

                // Complete the observable after receiving the room ID
                observer.complete();
            });
        });
    }

    // Listen for a specific event
    onEvent<T>(eventName: string): Observable<T> {
        return new Observable((observer) => {
            this.socket.on(eventName, (data: T) => {
                observer.next(data); // Push data to the subscriber
            });

            // Clean up when the observable is unsubscribed
            return () => {
                this.socket.off(eventName); // Remove the listener
            };
        });
    }

    // Emit a specific event
    emitEvent(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }

    disconnect() {
        this.socket?.disconnect();
        this.socketSubject.next(null!);  // Reset the socket subject
    }
    
}