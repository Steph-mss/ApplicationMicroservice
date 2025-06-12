import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';
import { CommonModule } from '@angular/common';

declare const grecaptcha: any;
declare global {
  interface Window {
    onCaptchaSuccess: (token: string) => void;
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  registerFrom: FormGroup;
  captchaToken: string | null = null;
  submitted = false;
  registerFailed = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private router = inject(Router);

  constructor() {
    this.registerFrom = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    window.onCaptchaSuccess = (token: string) => {
      this.captchaToken = token;
    };
  }

  register(): void {
    this.submitted = true;
    this.registerFailed = false;
    this.errorMessage = '';

    if (this.registerFrom.invalid || !this.captchaToken) return;

    const user: User = this.registerFrom.value;

    this.registerService.register(user, this.captchaToken).subscribe({
      next: (res) => {
        alert(res.message || 'Inscription réussie!');
        this.registerFrom.reset();
        this.captchaToken = null;
        this.submitted = false;
        this.registerFailed = false;
        grecaptcha.reset();
        this.navigatelogin();
      },
      error: (err) => {
        this.registerFailed = true;
        if (err?.error) {
          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else if (err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Une erreur est survenue';
          }
        } else {
          this.errorMessage = 'Erreur de connexion au serveur';
        }
        grecaptcha.reset();
      },
    });
  }
  navigatelogin() {
    this.router.navigate(['login']);
  }
}
