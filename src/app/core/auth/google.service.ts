import { Injectable } from '@angular/core';
import { env } from 'env/env';

declare const google: any;

@Injectable({
    providedIn: 'root',
})
export class GoogleAuthService {
    private clientId = env.google_client_id;
    private scriptLoaded = false;

    constructor() {}

    // Dynamically load the Google Identity Services SDK
    loadGoogleScript(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.scriptLoaded) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client?hl=en';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                this.scriptLoaded = true;
                resolve();
            };
            script.onerror = () => reject('Google SDK failed to load');
            document.body.appendChild(script);
        });
    }

    // Initialize Google Sign-In
    async initializeGoogleSignIn(onSuccess: (response: any) => void): Promise<void> {
        try {
            await this.loadGoogleScript();

            if (google && google.accounts) {
                google.accounts.id.initialize({
                    client_id: this.clientId,
                    callback: onSuccess,
                    // login_uri: 'http://localhost:4444/auth/sign-in', // Change to your actual redirect URI
                });

                google.accounts.id.renderButton(
                    document.getElementById('googleButton'),
                    {
                        theme: 'outline',
                        size: 'large',
                    }
                );
            } else {
                console.error('Google Identity Services SDK not available');
            }
        } catch (error) {
            console.error('Error loading Google Sign-In:', error);
        }
    }

    // Disable auto-select for Google accounts
    revokeAccess(): void {
        if (google?.accounts?.id) {
            google.accounts.id.disableAutoSelect();
        }
    }
}
