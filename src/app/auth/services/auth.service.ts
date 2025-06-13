import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../../models/jwt-response.model';
import { Categoria } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias/categorias.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private categoriasService: CategoriasService ) { }
    
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
  signupProfesional(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/profesionista`, userData);
  }
  
  login(credentials: { correo: string; password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials);
  }

  verificarCorreo(token: string ) {
  return this.http.post(`${this.apiUrl}/verify?token=${token}`, {});
  }

  loginSuccess(token: string, roles: string[]): void {
    localStorage.setItem('authToken', token); 
    if (roles.includes('ROLE_PRO')) {
      localStorage.setItem('userType', 'profesionista');
    } else if (roles.includes('ROLE_CLIENT')) {
      localStorage.setItem('userType', 'cliente');
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userNombre');
    localStorage.removeItem('userCorreo');
    localStorage.removeItem('userRoles');
  }

  getProfesionesAgrupadas(): Observable<Categoria[]> {
    return this.categoriasService.getProfesionesAgrupadas();
  }
  
  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }

  logoutBackend(): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
  
  
}
