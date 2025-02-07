import { ApplicationConfig }      from '@angular/core';
import { provideRouter }          from '@angular/router';
import { appRoutes }              from '../app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient }      from '@angular/common/http';
import { provideIcons }           from 'app/core/icons/icons.provider';
import { provideAuth }            from './core/auth/auth.provider';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideIcons(),
        provideAuth(),
    ]
};
