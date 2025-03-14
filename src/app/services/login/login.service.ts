import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/actions/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:44308/'; // Ajusta esta URL a tu backend

  constructor(private http: HttpClient, private store: Store) { }

  login(email: string, password: string): Observable<any> {
    // Realiza la petición POST al endpoint de login del backend
    return this.http.post(`${this.apiUrl}Auth/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    // Realiza la petición POST al endpoint de registro del backend
    return this.http.post(`${this.apiUrl}Auth/register`, {name, email, password});
  }

  // auth.service.ts (o en algún lugar central)
  checkToken(): void {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      this.store.dispatch(AuthActions.loginSuccess({ userName, token }));
    }
  }

}
