import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/component';
import { HeaderComponent } from '../header/component';

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
