import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'template.html',
    styleUrl: 'style.scss',
    standalone: true,
    imports: [
        RouterModule,
        MatIconModule,
    ],
})

export class SidebarComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
