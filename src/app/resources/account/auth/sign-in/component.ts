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
    selector: 'auth-sign-in',
    standalone: true,
    templateUrl: 'template.html',
    styleUrl: 'style.scss',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatCheckboxModule,
        MatCardModule,
        FormsModule,
    ],
})

export class AuthSignInComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    onLogin() {
        this.router.navigate(['/app/dashboard'])
    }
}
