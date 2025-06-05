import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignUpRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  tipoCuenta: string;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) { }
    
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
  signupProfesional(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/profesionista`, userData);
  }
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  verificarCorreo(token: string ) {
  return this.http.post(`${this.apiUrl}/verify?token=${token}`, {});
  }

}
