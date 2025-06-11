import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesionista } from '../../../models/profesionista.model';
import { PerfilProfesionistaService } from '../../../services/perfil-profesionista/perfil-profesionista.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-profesionista-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesionista-profile.page.html',
  styleUrl: './profesionista-profile.page.css'
})
export class ProfesionistaProfilePage {
  profesionista!: Profesionista;
  menuVisible = false;
  
  constructor(private perfilService: PerfilProfesionistaService, private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId')); 
    this.perfilService.obtenerPerfil(userId).subscribe({
      next: (data) => {
        this.profesionista = data;
      },
      error: (err) => {
        console.error('Error al cargar perfil del profesionista', err);
      }
    });
  }

  logout(): void {
    this.authService.logoutBackend().subscribe({
      next: (res) => {
        console.log('Logout backend:', res);
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
  
  
}
