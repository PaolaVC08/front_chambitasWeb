import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { Zona } from '../../models/zona.model';
import { ZonasService } from '../../services/zonas/zonas.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  categorias: Categoria[] = []; 
  zonas: Zona[] = [];
  categoriasFiltradas: Categoria[] = [];
  selectedCategoria: string = '';

  constructor(private categoriasService: CategoriasService, private zonasService: ZonasService) {}

  ngOnInit() {
    this.categoriasService.getProfesionesAgrupadas().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );

    this.zonasService.getAllZonas().subscribe(
      (data) => {
        this.zonas = data;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }
  onCategoriaChange(event: any): void {
    const categoriaSeleccionada = event.target.value;
    if (categoriaSeleccionada === '') {
     
      this.categoriasFiltradas = this.categorias;
    } else {

      this.categoriasFiltradas = this.categorias.filter(
        (cat) => cat.nombreCategoria === categoriaSeleccionada
      );
    }
  }
}
