import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CameraPage } from './camera/camera.page';
import { DetallePage } from './detalle/detalle.page';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { MapaPage } from './mapa/mapa.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'camera', component: CameraPage },
  { path: 'detalle', component: DetallePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'mapa', component: MapaPage },
  { path: 'home', component: HomePage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
