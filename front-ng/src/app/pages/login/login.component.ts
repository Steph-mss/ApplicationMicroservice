// login.component.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy{
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscritpion: Subscription |null = null;
  
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  invalidCredentials = false;

  login() {

    this.loginSubscritpion = this.loginService.login(this.loginForm.value as Credentials).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateHome();
      },error: error =>{
        this.invalidCredentials = true;
      }
    })
 
  }
  navigateHome(){
    this.router.navigate(['home']);
  }

  navigateRegister(){
    this.router.navigate(['register']);
  }

  ngOnDestroy(): void {
      this.loginSubscritpion?.unsubscribe();
  }
}
