import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-editar-biografia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-biografia.component.html',
  styleUrls: ['./editar-biografia.component.css']
})
export class EditarBiografiaComponent {
  @Input() biografiaActual: string = '';
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<string>();

  biografia: string = '';

  ngOnInit() {
    this.biografia = this.biografiaActual;
  }

  onGuardar() {
    if (this.biografia.trim().length > 0) {
      this.guardar.emit(this.biografia);
    }
  }

  onCerrar() {
    this.cerrar.emit();
  }
}


