import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Esto hace que Angular maneje el guard como un servicio global
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Este método se ejecuta cuando se intenta acceder a una ruta protegida
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true; 
    } else {
      console.log("debes iniciar sesion");
      this.router.navigate(['/login']);
      return false;
    }
  }
}