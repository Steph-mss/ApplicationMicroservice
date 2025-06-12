// login.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../../models/user.models';
import { environment } from '../../../environments/environment';
export interface Credentials {
  username: string;
  password: string;
}

// forme de la réponse du login
interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  user = signal<User | null>(null);

  /**
   * Envoie les identifiants, stocke le token, met à jour le signal et renvoie l'utilisateur
   */
  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signin`, credentials, {
      withCredentials: true
    }).pipe(
      tap(user => this.user.set(user))
    );
  }
  

  // /**
  //  * Récupère les infos du user courant, met à jour le signal et renvoie l'utilisateur
  //  */
  // getUser(): Observable<User> {
  //   return this.http
  //     .get<User>('/api/user')
  //     .pipe(
  //       map(raw => {
  //         const u = Object.assign(new User(), raw);
  //         this.user.set(u);
  //         return u;
  //       })
  //     );
  // }

 
 
}
