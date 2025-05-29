import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { CaptureService } from './../../../src/capture.service';

@Component({
  selector: 'app-camera',
  standalone: true,
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss']
})
export class CameraPage implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  especieDetectada: string = 'Cargando...';
  model: tmImage.CustomMobileNet | null = null;
  maxPrediction = 0;

  ubicacionActual: { lat: number; lng: number } | null = null;
  watchId: number | null = null;

  constructor(private captureService: CaptureService) {}

  async ngOnInit() {
    await this.cargarModelo();
    await this.iniciarCamara();
    this.detectLoop();
    this.iniciarUbicacion();
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  iniciarUbicacion() {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.ubicacionActual = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        (error) => {
          console.error('Error al obtener ubicación:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  }

  async cargarModelo() {
    const modelURL = '/assets/model/model.json';
    const metadataURL = '/assets/model/metadata.json';
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPrediction = this.model.getTotalClasses();
  }

  async iniciarCamara() {
    const video = this.videoRef.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
  }

  detectLoop() {
    const loop = async () => {
      if (!this.model) return;

      const prediction = await this.model.predict(this.videoRef.nativeElement);
      const best = prediction.sort((a, b) => b.probability - a.probability)[0];
      this.especieDetectada = best.className;

      requestAnimationFrame(loop);
    };
    loop();
  }

  async capturarFoto() {
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    await this.subirAFirebase(dataUrl, this.especieDetectada);
  }

  async subirAFirebase(base64: string, especie: string) {
    await this.captureService.subirCaptura(especie, base64, this.ubicacionActual);
  }
}
