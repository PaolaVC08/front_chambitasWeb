import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {
    form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: RouterModule
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
          //this.router.navigate(['/home']);
        },
        error: err => {
          alert('Credenciales incorrectas');
        }
      });
    }
  }
}
