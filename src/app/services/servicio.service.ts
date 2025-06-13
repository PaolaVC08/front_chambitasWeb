import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${API_URL}/servicios`, servicio, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${API_URL}/servicios/${id}`, servicio, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/servicios/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  obtenerMisServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${API_URL}/servicios/mis-servicios`, {
      headers: this.getAuthHeaders()
    });
  }
}


