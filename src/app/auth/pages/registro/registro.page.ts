import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.css'
})
export class RegistroPage {
    
    form = this.fb.group({
    nombres: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+( [A-Z][a-z]+)*$/)]],
    apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
    apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
    fechaNacimiento: ['', Validators.required],
    tipoCuenta: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit() {
      if (this.form.invalid){
        this.authService.registrar(this.form.value).subscribe({
        next: res => {
          console.log('Registro exitoso', res);
          alert("Registro exitoso");
          const formData = this.form.value;
          console.log('Datos del formulario:', formData);
             if (formData.tipoCuenta === 'Cuenta Profesional') {
                alert('Redirigir al segundo formulario...');
             } else {
                alert('Redirigir al login...');
                }
        },
        error: err => {
          console.error('Error en el registro', err);
          alert("Error en el registro");
        }
      });
     }
   /* const formData = this.form.value;
    console.log('Datos del formulario:', formData);

    if (formData.tipoCuenta === 'Cuenta Profesional') {
      // Redirigir a segundo formulario (más adelante)
      alert('Redirigir al segundo formulario...');
    } else {
      // Redirigir al login
      alert('Redirigir al login...');
    }*/
  }
}
