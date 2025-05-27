import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  categorias = [
    {
      nombre: 'Hogar y Reparaciones',
      profesiones: ['Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas','Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas','Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas','Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas']
    },
    {
      nombre: 'Salud y Belleza',
      profesiones: ['Estilistas', 'Masajistas', 'Manicuristas', 'Dentistas', 'Fisioterapeutas', 'Estilistas', 'Masajistas','Estilistas', 'Masajistas', 'Manicuristas', 'Dentistas', 'Fisioterapeutas', 'Estilistas', 'Masajistas','Estilistas', 'Masajistas', 'Manicuristas', 'Dentistas', 'Fisioterapeutas', 'Estilistas', 'Masajistas','Estilistas', 'Masajistas', 'Manicuristas', 'Dentistas', 'Fisioterapeutas', 'Estilistas', 'Masajistas']
    },
    {
      nombre: 'Hogar y Reparaciones',
      profesiones: ['Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas','Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas','Pintores', 'Electricistas', 'Fontaneros', 'Albañiles', 'Carpinteros', 'Pintores', 'Electricistas']
    }
  ];
}
