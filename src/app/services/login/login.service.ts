import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api'; // Ajusta esta URL a tu backend

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Realiza la petición POST al endpoint de login del backend
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }
}
