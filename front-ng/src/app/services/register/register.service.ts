import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../../models/user.models';
import { environment } from '../../../environments/environment';
export interface Credentials {
  username: string;
  mail: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    user = signal<User | null>(null);
  
    /**
     * Envoie les identifiants, stocke le token, met à jour le signal et renvoie l'utilisateur
     */
    register(user: User, captchaToken: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/signup`, { ...user, captchaToken }, { withCredentials: true });
    }
    
    
}
