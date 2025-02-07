import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        CommonModule
    ],
    selector: 'dashbaord-apge',
    templateUrl: 'dashboard.component.html',
    styleUrl: 'style.scss'
})

export class DashboardPageComponent implements OnInit {
    user: User = null!;
    sessions: any[] = [
        // {
        //     id: 1,
        //     data: { 
        //         game: 'wordcloud', 
        //         users: [
        //             1,2,3,4,5,6,7,8
        //         ], 
        //         gameDetail: { 
        //             hoster: '1',
        //             question: 'how old are you?',
        //             messages: [
        //                 1,2,3,4,5,6,20
        //             ]
        //         }
        //     },
        //     createdAt: new Date(Date.now()).toISOString().split('T')[0],
        // }
    ];

    constructor(
        private _userService: UserService,
        private _dashboardService: DashboardService
    ) { }

    ngOnInit() { 
        this._userService.user$.subscribe((user: any) => { 
            this.user = user;

            this.fetch(this.user.id)
        });
    }

    fetch(id: number){
        this._dashboardService.getSessions(id).subscribe(res => {
            this.sessions = res;
        });
    }
}