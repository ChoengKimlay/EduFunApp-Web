import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/component';
import { HeaderComponent } from '../layout/header/component';

@Component({
    standalone: true,
    imports: [
        SidebarComponent,
        HeaderComponent
    ],
    selector: 'dashboard-page',
    templateUrl: 'template.html'
})

export class DashboardPageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
