import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
   {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
   }, {
        path:'login',
        component: LoginComponent
    },{
        path:'home',
        component: HomeComponent
    },
    {
        path:'register',
        component: RegisterComponent
        
    }
];
