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
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }
    registrar(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
