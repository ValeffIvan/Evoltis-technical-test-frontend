import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/actions/auth.actions';
import { environment } from '../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.API_URL+'Auth/';

  constructor(private http: HttpClient, private store: Store) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, {name, email, password});
  }
  checkToken(): void {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      this.store.dispatch(AuthActions.loginSuccess({ userName, token }));
    }
  }

}
