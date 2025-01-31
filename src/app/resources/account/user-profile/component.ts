// account-profile.component.ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'account-profile',
    templateUrl: 'template.html',
    // styleUrls: ['./account-profile.component.css'],
    standalone: true,
    imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
})
export class AccountProfileComponent {
    profileForm = this.fb.group({
        firstName: ['John', [Validators.required]],
        lastName: ['Doe', [Validators.required]],
        email: ['john.doe@example.com', [Validators.required, Validators.email]],
        phone: ['+1 234 567 890'],
        company: ['Tech Corp'],
        jobTitle: ['Senior Developer'],
        timezone: ['GMT-4', [Validators.required]],
        bio: ['Experienced full-stack developer passionate about clean code'],
    });

    securityForm = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
    });

    preferences = this.fb.group({
        newsletter: [true],
        notifications: [false],
        theme: ['light']
    });

    constructor(private fb: FormBuilder) { }

    onSubmit() {
        if (this.profileForm.valid) {
            console.log('Profile updated:', this.profileForm.value);
        }
    }
}
