import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  protected readonly fb = inject(FormBuilder);

  protected readonly authService = inject(AuthService);
  protected readonly userService = inject(UserService);

  protected readonly router = inject(Router);

  protected lastError$:any;
  protected sentReset=false;

  resetingPassword = false;

  protected loginForm = this.fb.group({
    email: new FormControl('', { nonNullable: true}),
    password: new FormControl('', { nonNullable: true})
  });
  
  protected resetForm = this.fb.group({
    resetEmail: new FormControl('', { nonNullable: true})
  });

  onSubmit(): void {
    const data = this.loginForm.getRawValue();

    this.authService.login(data).subscribe({
      next: () => {
        this.lastError$ = null
      },
      error: (error) => {
        this.lastError$ = error.error
        console.log(this.lastError$)
      }
    });
  }
  
  toggleToResetPassword(){
    this.resetingPassword = !this.resetingPassword;
  }

  resetPassword():void{
    this.userService.changePassword(this.resetForm.getRawValue().resetEmail)
    .subscribe(
      {
        next: (x) => {
          this.lastError$ = null
          this.sentReset=true          
        },
        error: (error) => {
          this.lastError$ = error
          console.log(this.lastError$)
        }
      }
    )
  }
}
