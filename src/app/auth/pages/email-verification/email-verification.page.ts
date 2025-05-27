import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, TopbarPage],
  templateUrl: './email-verification.page.html',
  styleUrl: './email-verification.page.css'
})
export class EmailVerificationPage {
  ngOnInit() {
    document.body.classList.add('auth-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }
  mensaje: string = '';
  constructor(private authService: AuthService) {}

  reenviarCorreo() {
    this.authService.reenviarCorreo().subscribe({
      next: (res: any) => {
        this.mensaje = res.message || 'Correo reenviado correctamente.';
      },
      error: (err) => {
        this.mensaje = err.error?.message || 'Error al reenviar el correo.';
      }
    });
  }
}
