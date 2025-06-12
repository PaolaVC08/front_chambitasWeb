import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesionista } from '../../models/profesionista.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilProfesionistaService {
  private apiUrl = 'https://chambitas-web-api-latest.onrender.com/api/perfilprofesionista';

  constructor(private http: HttpClient) { }

  obtenerPerfil(): Observable<Profesionista> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Profesionista>(`${this.apiUrl}/yo`, { headers });
  }
}
