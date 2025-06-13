import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesionista } from '../../../models/profesionista.model';
import { PerfilProfesionistaService } from '../../../services/perfil-profesionista/perfil-profesionista.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ServiciosComponent } from '../../../components/servicios/servicios.component';
import { Servicio } from '../../../models/servicio.model';
import { ServicioService } from '../../../services/servicio.service';

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

  // 🧩 Modal control
  mostrarModalServicio = false;
  editandoServicio = false;
  servicioSeleccionado?: Servicio;

  constructor(
    private perfilService: PerfilProfesionistaService,
    private authService: AuthService,
    private router: Router,
    private servicioService: ServicioService // para eliminar
  ) { }

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
          servicios: data.servicios.map((s: any) => ({
            id: s.idServicio,
            nombre: s.nombre,
            descripcion: s.descripcion,
            imagenesBase64: s.imagenesBase64 ?? []
          })),
          roles: data.profesionistaProfesiones.map((p: any) => ({
            id: p.profesionId,
            nombre: p.profesionNombre
          })),
          mediosdeContacto: data.medioContactoResponses.map((c: any) => ({
            id: c.idMcontacto,
            tipoContactoId: c.tipoContactoId,
            tipo: c.tipoContactoNombre,
            valor: c.valor,
            profesionistaId: ''
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
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  //Crear nuevo
  abrirModalAgregarServicio() {
    this.editandoServicio = false;
    this.servicioSeleccionado = undefined;
    this.mostrarModalServicio = true;
  }

  //Editar
  editarServicio(servicio: Servicio) {
    this.editandoServicio = true;
    this.servicioSeleccionado = servicio;
    this.mostrarModalServicio = true;
  }

  // Eliminar
  eliminarServicio(servicio: Servicio) {
    if (confirm(`¿Eliminar el servicio "${servicio.nombre}"?`)) {
      this.servicioService.eliminarServicio(servicio.id!).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('Error al eliminar servicio:', err)
      });
    }
  }

  cerrarModalServicio() {
    this.mostrarModalServicio = false;
    this.servicioSeleccionado = undefined;
    this.editandoServicio = false;
  }

  refrescarPerfil() {
    this.ngOnInit();
  }
}
