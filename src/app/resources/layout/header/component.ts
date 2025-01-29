import { Component, NgZone, OnInit } from '@angular/core';
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
        private authService: AuthService, private router: Router, private zone: NgZone,
    ) { }

    ngOnInit() { }

    logout() {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.zone.run(() => {
            this.router.navigate(['/auth/sign-in']).then(success => {
                if (!success) {
                    console.log('Redirect failed');
                } else {
                    console.log('Redirect successful');
                }
            }).catch(err => {
                console.error('Error during navigation:', err);
            });
        });
    }

}
