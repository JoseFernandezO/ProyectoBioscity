import { Injectable } from '@angular/core';
import { db } from './firebaseClient';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {
  async subirCaptura(
    especie: string,
    imagenBase64: string,
    ubicacion: { lat: number; lng: number } | null
  ): Promise<void> {
    const captura = {
      especie,
      fecha: new Date().toISOString(),
      imagen: imagenBase64,
      ubicacion: ubicacion ?? { lat: null, lng: null }
    };

    try {
      await addDoc(collection(db, 'captures'), captura);
      console.log('Captura subida a Firestore con ubicación:', captura);
    } catch (error) {
      console.error('Error al subir la captura:', error);
    }
  }
}
