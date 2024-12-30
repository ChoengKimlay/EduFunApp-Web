import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule
  ],
  selector: 'login-page',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})

export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  onLogin() {
    // This is where you would typically handle authentication
    // For now, let's assume the login is successful and navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }
}
