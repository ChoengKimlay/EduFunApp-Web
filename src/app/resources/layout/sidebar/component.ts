import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'template.html',
    styleUrl: 'style.scss',
    standalone: true,
    imports: [
        RouterModule
    ],
})

export class SidebarComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
