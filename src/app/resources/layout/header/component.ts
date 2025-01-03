import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule
    ],
    selector: 'app-header',
    templateUrl: 'template.html'
})

export class HeaderComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    logout() {
        // Clear user session or local storage
        // localStorage.removeItem('userToken'); // Adjust according to how you manage authentication
        // sessionStorage.clear(); // Or clear everything in the session storage

        // Navigate to login page
        this.router.navigate(['/login-page']);
    }
}
