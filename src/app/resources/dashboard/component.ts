import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/component';
import { HeaderComponent } from '../layout/header/component';
import { DashboardService } from './service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dashboard-page',
    standalone: true,
    templateUrl: 'template.html',
    imports: [
        SidebarComponent,
        HeaderComponent,
        CommonModule,
    ],
})

export class DashboardPageComponent implements OnInit {

    isSidebarOpen = false;

    constructor(private service: DashboardService) { }

    ngOnInit() {

    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
