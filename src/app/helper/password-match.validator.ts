import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirm_password');

        // If password and confirm_password don't match
        return password &&
            confirmPassword &&
            password.value !== confirmPassword.value
            ? { passwordMismatch: true }
            : null; // Return null if no error
    };
}
