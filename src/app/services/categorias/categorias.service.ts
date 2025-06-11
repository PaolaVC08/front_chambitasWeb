import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'https://chambitas-web-api-latest.onrender.com/api';
  
  constructor(private http: HttpClient) { }

  getProfesionesAgrupadas(): Observable<any[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }
  getProfesionesPorCategoria(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/${id}`);
  }
  searchCategorias(query: string) {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/search?query=${query}`);
  }
  
}
