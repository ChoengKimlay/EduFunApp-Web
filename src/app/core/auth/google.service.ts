import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google Client ID

  constructor() {}

  // Dynamically load the Google Identity Services SDK
  loadGoogleScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  // Initialize Google Sign-In and render the button
  initializeGoogleSignIn(onSuccess: (response: any) => void): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: onSuccess,
    });

    google.accounts.id.renderButton(
      document.getElementById('googleButton'), // Target element for button
      {
        theme: 'outline', // Button style
        size: 'large', // Button size
      }
    );
  }

  // Disable auto-select for Google accounts
  revokeAccess(): void {
    google.accounts.id.disableAutoSelect();
  }
}
