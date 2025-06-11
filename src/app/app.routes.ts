import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.page').then(m => m.MainLayoutPage),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
        canActivate: [AuthGuard]
      },
      {
        path: 'search-page',
        loadComponent: () => import('./pages/search-page/search-page.page').then(m => m.SearchPagePage),
        canActivate: [AuthGuard]
      },
      {
        path: 'profesionista-profile',
        loadComponent: () => import('./pages/profile/profesionista-profile/profesionista-profile.page').then(m => m.ProfesionistaProfilePage),
        canActivate: [AuthGuard]
      },
      {
      path: 'cliente-profile',
        loadComponent: () => import('./pages/profile/cliente-profile/cliente-profile.page').then(m => m.ClienteProfilePage),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
    {
    path: 'signup',
    loadComponent: () => import('./auth/pages/registro/registro.page').then(m => m.RegistroPage)
  },

   {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
  },

  {
  path: 'email-verification',
  loadComponent: () =>
    import('./auth/pages/email-verification/email-verification.page')
      .then(m => m.EmailVerificationPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
