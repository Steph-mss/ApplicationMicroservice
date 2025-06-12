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

export class LogoutService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  user = signal<User | null>(null);
 /**
   * Détruit la session côté client et renvoie null
   */
 
  logout(): Observable<null> {
    return this.http
      .post<null>(`${this.apiUrl}/logout`, {}, { withCredentials: true }) // `withCredentials` est nécessaire
      .pipe(
        map(() => {
          this.user.set(null);
          return null;
        })
      );
  }
}
