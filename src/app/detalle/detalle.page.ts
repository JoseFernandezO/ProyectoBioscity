import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebaseClient';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  reporte: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const ref = doc(db, 'noticias', id!);
    const snap = await getDoc(ref);
    if (snap.exists()) this.reporte = snap.data();
  }

  volver() {
    this.router.navigate(['/home']);
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