import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: 'template.html',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule
    ],
})

export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    logout() {
        this.router.navigate(['/login-page']);
    }
}
