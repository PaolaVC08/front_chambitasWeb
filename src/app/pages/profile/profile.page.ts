import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})
export class ProfilePage {
  profile = {
    nombre: 'Aditi Agarwal',
    roles: ['Electricista', 'Plomero', 'Carpintero'],
    contacto: {
      whatsapp: '271 123 4567',
      correo: 'aditiaw@gmail.com',
      zona: 'Córdoba - Orizaba'
    },
    favoritosCount: 210
  };

  biografia = `Hello! I am currently an Electronics and Computer Engineering student at Arrancar University, where I am eagerly immersing myself in the world of technology and innovation. With a keen interest in automotive engineering, UI/UX-designing, data science, and machine learning.`;

  certificados = [
    { institucion: 'Oxford', descripcion: 'Inglés avanzado C1 (2025)' },
    { institucion: 'Google', descripcion: 'Java + API (2022)' }
  ];

  education = [
    { institucion: 'Tecnológico de Zongolica', descripcion: 'Gestión de Negocios (2019 - 2024)' },
    { institucion: 'Cobaev 34', descripcion: 'Bachillerato (2016 - 2019)' }
  ];

  servicios = [
    {
      titulo: 'Instalación de Contactos y Tomas de Corriente',
      descripcion: 'Colocación de nuevos enchufes eléctricos en distintas áreas de una vivienda o local comercial, asegurando su correcta conexión al sistema eléctrico existente.',
      precio: '$300 MXN',
      imagenes: Array(5).fill('') // solo placeholders, sin imágenes reales
    }
  ];
}
