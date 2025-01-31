import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

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
