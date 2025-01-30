import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { appRoutes } from '../app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes), provideAnimationsAsync(),
        provideHttpClient(),
    ]
};
