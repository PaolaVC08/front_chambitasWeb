import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { FormValidator } from '../../../validators/form-validator';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TopbarPage],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {

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
      email: this.form.value.correo!,
      password: this.form.value.contraseña!
    };
        this.authService.login(loginData).subscribe({
        next: res => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']);
        },
        error: err => {
          alert('Credenciales incorrectas');
        }
      });
    }
  }
}
