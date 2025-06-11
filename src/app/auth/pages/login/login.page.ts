import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { FormValidator } from '../../../validators/form-validator';
import { JwtResponse } from '../../../models/jwt-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TopbarPage],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {

  passwordVisible = false;

    ngOnInit() {
    document.body.classList.add('auth-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }

    form = this.fb.group({
    correo: ['', [Validators.required, FormValidator.correoValidator()]],
    contraseña: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const loginData = {
        correo: this.form.value.correo!,
        password: this.form.value.contraseña!
      };

      this.authService.login(loginData).subscribe({
        next: (res: JwtResponse) => {  
          const token = res.accessToken;
          const roles = res.roles;
         
          this.authService.loginSuccess(token, roles);

          localStorage.setItem('userId', res.id.toString());
          localStorage.setItem('userNombre', res.nombre);
          localStorage.setItem('userCorreo', res.correo);
          localStorage.setItem('userRoles', JSON.stringify(res.roles));
          console.log("Inicio de sesion exitoso");
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Credenciales incorrectas');
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
