import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizarLista = new EventEmitter<void>();

  nuevoServicio: Servicio = { nombre: '', descripcion: '',  imagenesBase64: [] };
  servicioSeleccionado?: Servicio;
  mostrarModal = true;
  editando = false;

  constructor(private servicioService: ServicioService) {}

  guardar() {
    const servicio = this.editando ? this.servicioSeleccionado! : this.nuevoServicio;

    const peticion = this.editando
      ? this.servicioService.actualizarServicio(servicio.id!, servicio)
      : this.servicioService.crearServicio(servicio);

    peticion.subscribe(() => {
      this.actualizarLista.emit();
      this.cerrar.emit();
    });
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  get servicioEnEdicion(): Servicio {
    return this.editando ? this.servicioSeleccionado! : this.nuevoServicio;
  }
}


