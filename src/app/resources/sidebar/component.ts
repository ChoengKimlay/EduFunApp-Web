import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule
  ],
  selector: 'app-sidebar',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})

export class SidebarComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
