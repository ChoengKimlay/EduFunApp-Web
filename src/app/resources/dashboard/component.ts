import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/component';
import { HeaderComponent } from '../layout/header/component';
import { DashboardService } from './service';

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

    constructor(private service: DashboardService) { }

    ngOnInit() {

    }

}
