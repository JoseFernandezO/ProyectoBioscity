import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.page').then(m => m.CameraPage),
  },
  {
    path: 'mapa',
    loadComponent: () => import('./mapa/mapa.page').then(m => m.MapaPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./detalle/detalle.page').then(m => m.DetallePage),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];