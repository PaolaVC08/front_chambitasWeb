import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class ServiciosComponent implements OnChanges {

  @Input() servicioAEditar?: Servicio;
  @Input() modoEdicion: boolean = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizarLista = new EventEmitter<void>();

  nuevoServicio: Servicio = { nombre: '', descripcion: '', imagenesBase64: [] };
  servicioSeleccionado: Servicio = { nombre: '', descripcion: '', imagenesBase64: [] };
  mostrarModal = true;
  editando = false;

  constructor(private servicioService: ServicioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modoEdicion'] || changes['servicioAEditar']) {
      this.editando = this.modoEdicion;

      if (this.editando && this.servicioAEditar) {
        this.servicioSeleccionado = { ...this.servicioAEditar };
      } else {
        this.servicioSeleccionado = { nombre: '', descripcion: '', imagenesBase64: [] };
      }
    }
  }

guardar() {
  const servicio = this.editando ? this.servicioSeleccionado : this.nuevoServicio;

  const nombreValido = servicio.nombre.trim().length > 0;
  const descripcionValida = servicio.descripcion.trim().length > 0;

  if (!nombreValido || !descripcionValida) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  const peticion = this.editando
    ? this.servicioService.actualizarServicio(servicio.id!, servicio)
    : this.servicioService.crearServicio(servicio);

  peticion.subscribe({
    next: () => {
      this.actualizarLista.emit();
      this.cerrar.emit();
    },
    error: (err) => {
      console.error('❌ Error al guardar servicio:', err);
    }
  });
}


  cerrarModal() {
    this.cerrar.emit();
  }

  get servicioEnEdicion(): Servicio {
    return this.editando ? this.servicioSeleccionado : this.nuevoServicio;
  }
}



