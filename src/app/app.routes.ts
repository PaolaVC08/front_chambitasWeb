import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'registro',
    loadComponent: () => import('./auth/pages/registro/registro.page').then(m => m.RegistroPage)
  },

   {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  }
];
