import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Participant } from './participant.type';

@Injectable({providedIn: 'root'})
export class ParticipantService {
    
    private _participant: ReplaySubject<Participant> = new ReplaySubject<Participant>(1);
    
    constructor() { }

    set participant(value: Participant) {
        this._participant.next(value);
    }

    get participant$(): Observable<Participant> {
        return this._participant.asObservable();
    }
    
}