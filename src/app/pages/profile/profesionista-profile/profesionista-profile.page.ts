import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesionista } from '../../../models/profesionista.model';
import { PerfilProfesionistaService } from '../../../services/perfil-profesionista/perfil-profesionista.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ServiciosComponent } from '../../../components/servicios/servicios.component';

@Component({
  selector: 'app-profesionista-profile',
  standalone: true,
  imports: [CommonModule, ServiciosComponent],
  templateUrl: './profesionista-profile.page.html',
  styleUrl: './profesionista-profile.page.css'
})
export class ProfesionistaProfilePage {
  profesionista!: Profesionista;
  profesionesString: string = '';
  menuVisible = false;
  mostrarModalServicio = false;


  constructor(
    private perfilService: PerfilProfesionistaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.perfilService.obtenerPerfil().subscribe({
      next: (data: any) => {
        this.profesionista = {
          id: data.id,
          nombre: data.nombre,
          biografia: data.biografia,
          likes: data.likes,
          zonas: data.zonas,
          certificados: data.certificados,
          educaciones: data.educaciones,
          servicios: data.servicios,
          roles: data.profesionistaProfesiones.map((p: any) => ({
            id: p.profesionId,
            nombre: p.profesionNombre
          })),
          mediosdeContacto: data.medioContactoResponses.map((c: any) => ({
            id: c.idMcontacto,
            tipoContactoId: c.tipoContactoId,
            tipo: c.tipoContactoNombre, // opcional, para mostrar "WhatsApp"
            valor: c.valor,
            profesionistaId: '' // puedes quitarlo si no lo usas
          }))
        };

        this.profesionesString = this.profesionista.roles.map(r => r.nombre).join(', ');
      },
      error: (err) => {
        console.error('Error al cargar perfil del profesionista', err);
      }
    });
  }

  logout(): void {
    this.authService.logoutBackend().subscribe({
      next: (res) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
  abrirModalAgregarServicio() {
  this.mostrarModalServicio = true;
}
cerrarModalServicio() {
  this.mostrarModalServicio = false;
}
}