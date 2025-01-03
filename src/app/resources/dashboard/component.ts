import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/component';
import { HeaderComponent } from '../layout/header/component';

@Component({
    selector: 'dashboard-page',
    standalone: true,
    templateUrl: 'template.html',
    imports: [
        SidebarComponent,
        HeaderComponent
    ],
})

export class DashboardPageComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
