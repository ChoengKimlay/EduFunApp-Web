// Core
import { Injectable } from '@angular/core';

// RxJS
import { Observable, ReplaySubject } from 'rxjs';

// Helper
import { HelperNavigationItem } from 'helper/components/navigation';
import { RoleEnum } from 'helper/enums/role.enum';

// Interface
import { Role } from '../user/user.types';

// Navigation Data
import { navigationData } from './navigation.data';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    private _navigation: ReplaySubject<HelperNavigationItem[]> = new ReplaySubject<HelperNavigationItem[]>(1);

    set navigations(role: Role) {
        switch (role.name) {
            case RoleEnum.USER: this._navigation.next(navigationData.user); break;
            default:            this._navigation.next([]);                  break;
        }
    }

    get navigations$(): Observable<HelperNavigationItem[]> {
        return this._navigation.asObservable();
    }
}
