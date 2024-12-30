import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  selector: 'landing-page',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})

export class LandingComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
