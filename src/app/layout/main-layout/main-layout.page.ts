import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.page.html',
  styleUrl: './main-layout.page.css'
})
export class MainLayoutPage {
  userType: string=''; // Variable que almacena la búsqueda del usuario
  isProfileActive: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    const userType = localStorage.getItem('userType');
    this.userType = localStorage.getItem('userRoles')?.includes('ROLE_CLIENT') ? 'cliente' : 'profesionista';
    this.router.events.subscribe(() => {
      this.isProfileActive = this.router.url.includes('profile');
    });
  }
  goToProfile(): void {
    if (this.userType === 'cliente') {
      this.router.navigate(['/cliente-profile']);
    } else {
      this.router.navigate(['/profesionista-profile']);
    }
  }

  favoritos = Array(50).fill('Ander Luna');
}
