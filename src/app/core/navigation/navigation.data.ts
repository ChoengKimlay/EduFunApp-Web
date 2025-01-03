//
import { HelperNavigationItem } from 'helper/components/navigation';

const userNavigation: HelperNavigationItem[] = [
    {
        id: 'dashboard',
        type: 'basic',
        icon: 'mdi:view-dashboard-outline',
        link: '/user/dashboard',
    },
];

export const navigationData = {
    user: userNavigation
}
