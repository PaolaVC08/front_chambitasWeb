import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../../models/jwt-response.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://chambitas-web-api-latest.onrender.com/api';
  constructor(private http: HttpClient) { }
    
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }
  signupProfesional(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/profesionista`, userData);
  }
  login(credentials: { correo: string; password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  verificarCorreo(token: string ) {
  return this.http.post(`${this.apiUrl}/auth/verify?token=${token}`, {});
  }

  getProfesionesAgrupadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  loginSuccess(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
