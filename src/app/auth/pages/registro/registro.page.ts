import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { FormValidator } from '../../../validators/form-validator';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TopbarPage],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.css'
})
export class RegistroPage {
 maxDate: String;
 tipoUsuario: string = '';

ngOnInit() {
    document.body.classList.add('auth-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }

  form = this.fb.group({
    nombre: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
    apellidoPaterno: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
    apellidoMaterno: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
    fechaNacimiento: ['', [Validators.required, FormValidator.edadValidator()]],
    tipoUsuario: ['', Validators.required],
    correo: ['', [Validators.required, FormValidator.correoValidator()]],
    contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), FormValidator.contraseñaValidator()]],
    profesion: [''],
    zona: ['']
  });

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router){
                const today = new Date();
                this.maxDate = today.toISOString().split('T')[0];
              }
  onTipoUsuarioChange(event: any): void {
    this.tipoUsuario = event.target.value;
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
        profesion: formValue.profesion,
        zona: formValue.zona 
      };
      const tipoCuentaTemp=formValue.tipoUsuario;
      
      if (tipoCuentaTemp=='Cuenta Profesional'){

        this.authService.signupProfesional(userRequestDTO).subscribe({
          next: res => {
            const msg = res.message || 'Registro de Profesionista exitoso. Revisa tu correo.';
            alert(msg);
          },
          error: err => {
            const errorMsg = err.error?.message ;
            alert(errorMsg);
          }
        });
      }else{
        this.authService.signup(userRequestDTO).subscribe({
          next: res => {
            const msg = res.message || 'Registro de Cliente exitoso. Revisa tu correo.';
            alert(msg);
          },
          error: err => {
            const errorMsg = err.error?.message || 'Error en el registro de Cliente';
            alert(errorMsg);
          }
        });
      }
    }
  }

  capitalizeFirstLetter(event: any): void {
    let value = event.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    event.target.value = value;
  }
  
}
