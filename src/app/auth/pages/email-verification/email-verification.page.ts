import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, TopbarPage],
  templateUrl: './email-verification.page.html',
  styleUrl: './email-verification.page.css'
})
export class EmailVerificationPage implements OnInit, OnDestroy {
  mensaje: string = '';
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    document.body.classList.add('auth-background');

    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verificarCorreo(token).subscribe({
        next: (res: any) => {
          this.mensaje = res.message || 'Cuenta verificada correctamente.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.mensaje = err.error?.message || 'Token inválido o expirado.';
        }
      });
    }
  }
  
  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }

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
