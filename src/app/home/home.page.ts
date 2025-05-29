import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/firebaseClient';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage {
  userName = 'Silvana';
  reportes: any[] = [];


  constructor(private router: Router) {
    this.cargarReportes();


  }

  abrirCamara() {
    this.router.navigate(['/camera']);
  }

  async cargarReportes() {
    const snapshot = await getDocs(collection(db, 'noticias'));
    this.reportes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  getColor(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'crítico': return 'danger';
      case 'peligro': return 'warning';
      case 'estable': return 'success';
      default: return 'medium';
    }
  }


}
