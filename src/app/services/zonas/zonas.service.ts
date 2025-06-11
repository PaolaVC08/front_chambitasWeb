import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zona } from '../../models/zona.model';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private apiUrl = 'https://chambitas-web-api-latest.onrender.com/api/auth/zonas';

  constructor(private http: HttpClient) { }

  getAllZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.apiUrl}/todaslaszonas`);
  }
}
