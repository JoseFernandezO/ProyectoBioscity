import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importación de tus páginas
import { CameraPage } from './camera/camera.page';
import { DetallePage } from './detalle/detalle.page';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { MapaPage } from './mapa/mapa.page';
import { HomePage } from './home/home.page';

@NgModule({
  declarations: [
    AppComponent,
    CameraPage,
    DetallePage,
    LoginPage,
    RegisterPage,
    MapaPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
