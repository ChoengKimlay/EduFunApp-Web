import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { finalize, takeUntil } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { UnsubcribeClass } from '../../core/class/unsubcribe.class';

@Component({
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'login-page',
  templateUrl: 'template.html',
})

export class LoginPageComponent extends UnsubcribeClass implements OnInit, OnDestroy {
  loginForm: any;

  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { 
    super();
  }

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
    
  }

  onLogin() {
    const body = this.loginForm.value;
    // This is where you would typically handle authentication
    // For now, let's assume the login is successful and navigate to the dashboard
    this.authService.login(body?.email!, body?.password!).pipe(
      // Handle login response
      takeUntil(this.unsubscribe$),
      finalize(() => (this.isLoading = false)),
    ).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/dashboard']);
        
      },error(err){
        console.log(err);
      }
    });
  }
}
