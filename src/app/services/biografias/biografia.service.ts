import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biografia } from '../../models/biografia.model';

const API_URL = 'http://localhost:8080/api/biografia'; // actualiza la URL



@Injectable({
  providedIn: 'root'
})
export class BiografiaService {
  constructor(private http: HttpClient) {}

private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('authToken');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

  getBiografia(): Observable<Biografia[]> {
    return this.http.get<Biografia[]>(`${API_URL}/mis-biografias`);
  }

  crearBiografia(bio: Biografia): Observable<Biografia> {
    return this.http.post<Biografia>(`${API_URL}/crear`, bio, {
        headers: this.getAuthHeaders()
    });
  }

actualizarBiografia(bio: Biografia): Observable<Biografia> {
  return this.http.put<Biografia>(`${API_URL}/actualizar`, bio, {
    headers: this.getAuthHeaders()
  });
}

eliminarBiografia(): Observable<void> {
  return this.http.delete<void>(`${API_URL}/eliminar`, {
    headers: this.getAuthHeaders()
  });
}
}