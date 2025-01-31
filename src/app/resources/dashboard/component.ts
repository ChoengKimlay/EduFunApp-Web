import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/component';
import { HeaderComponent } from '../layout/header/component';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs';
import { UnsubscribeClass } from 'app/core/class/unsubscribe.class';

@Component({
    selector: 'dashboard-page',
    standalone: true,
    templateUrl: 'template.html',
    imports: [
        SidebarComponent,
        HeaderComponent,
        CommonModule,
    ],
})

export class DashboardPageComponent extends UnsubscribeClass implements OnInit, OnDestroy {

    isSidebarOpen = false;
    user: User | null = null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
    ) {
        super();
    }

    ngOnInit() {
        // Subscribe to user changes
        this._userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
            this.user = user;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
