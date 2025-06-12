import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  user = signal<User | null>(null);

  // login(credentials: { username: string; password: string }): Observable<User> {
  //   return this.http.post<User>('http://localhost:8080/api/auth/signin', credentials, {
  //     withCredentials: true
  //   }).pipe(
  //     tap((user) => this.user.set(user))
  //   );
  // }

  // logout(): Observable<null> {
  //   return this.http.post<null>('http://localhost:8080/api/auth/logout', {}, {
  //     withCredentials: true
  //   }).pipe(
  //     tap(() => this.user.set(null))
  //   );
  // }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/api/auth/me', {
      withCredentials: true
    }).pipe(
      tap(user => this.user.set(user))
    );
  }
}
