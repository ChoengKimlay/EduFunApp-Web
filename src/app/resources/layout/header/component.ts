import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonModule } from '@angular/common';

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
        MatMenuModule,
        RouterModule,
        CommonModule,
    ],
})

export class HeaderComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) { }

    ngOnInit() {


    }

    logout() {
        this._authService.logout();
        this._router.navigate(['/auth/sign-in']);
        window.location.reload();
    }

}
