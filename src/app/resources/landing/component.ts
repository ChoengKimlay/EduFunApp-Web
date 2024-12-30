import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    
  ],
  selector: 'landing-page',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})

export class LandingComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
