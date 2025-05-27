import { Routes } from '@angular/router';
export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.page').then(m => m.MainLayoutPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'search-page',
        loadComponent: () => import('./pages/search-page/search-page.page').then(m => m.SearchPagePage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  /*{
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },*/

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
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  }
];
