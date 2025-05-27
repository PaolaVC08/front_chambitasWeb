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
             {}
  onSubmit() {
     if (this.form.valid) {

      const formValue = this.form.value;
        const userRequestDTO = {
        username: formValue.nombre,
        apellidoPaterno: formValue.apellidoPaterno,
        apellidoMaterno: formValue.apellidoMaterno,
        fechaNacimiento: formValue.fechaNacimiento,
        email: formValue.correo,
        password: formValue.contraseña,
        //tipoUsuario: formValue.tipoUsuario === 'Cuenta Profesional' ? 'PROFESIONISTA' : 'CLIENTE',
        //fotoPerfilB64: ''
      };
      
      
//            this.router.navigate(['/email-verification']);
   

      this.authService.signup(userRequestDTO).subscribe({
        next: res => {
          console.log('Registro exitoso', res);
          alert("Registro exitoso. Redirigiendo a verificacion de correo...");
          setTimeout(() => {
            this.router.navigate(['/email-verification']);
          }, 3000); 

          /*if (userRequestDTO.tipoUsuario === 'PROFESIONISTA') {
            alert("Dirigiendo al registro profesionista");
              //this.router.navigate(['/registro-profesional']);
          } else {
             alert("Dirigiendo al login");
             this.router.navigate(['/login']);
          }*/
        },
        error: err => {
          console.error('Error en el registro', err);
          alert("Error en el registro");
        }
      });
    }
  }
}
