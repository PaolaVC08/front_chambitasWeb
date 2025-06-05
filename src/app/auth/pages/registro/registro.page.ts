import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TopbarPage],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.css'
})
export class RegistroPage {
 
  maxDate: string;
ngOnInit() {
    document.body.classList.add('auth-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }

form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+( [A-Z][a-z]+)*$/)]],
    apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
    apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
    fechaNacimiento: ['', Validators.required],
    tipoUsuario: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]]
  });

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router)
             {
              const today = new Date();
              const birthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    this.maxDate = birthDate.toISOString().split('T')[0];

             }
  onSubmit() {

     if (this.form.valid) {
      const formValue = this.form.value;
        const userRequestDTO = {
        nombre: formValue.nombre,
        apPaterno: formValue.apellidoPaterno,
        apMaterno: formValue.apellidoMaterno,
        fechaNacimiento: formValue.fechaNacimiento,
        correo: formValue.correo,
        password: formValue.contraseña,
        tipoUsuario: formValue.tipoUsuario === 'Cuenta Profesional' ? 'PROFESIONISTA' : 'CLIENTE',//ya no le mando el rol, solo va a servir este combo box para traer la info extra
        //fotoPerfilB64: ''
      };
      
      this.authService.signup(userRequestDTO).subscribe({
        next: res => {
          const msg = res.message || 'Registro exitoso. Revisa tu correo.';
          alert(msg);
        },
        error: err => {
          const errorMsg = err.error?.message || 'Error en el registro';
          alert(errorMsg);
        }
      });
    }
  }

  capitalizeFirstLetter(event: any): void {
    let value = event.target.value;
    // Convierte la primera letra a mayúscula y el resto a minúsculas
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    event.target.value = value;
  }
  
}
