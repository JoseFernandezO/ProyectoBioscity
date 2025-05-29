import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-species-camera',
  templateUrl: './species-camera.component.html',
  styleUrls: ['./species-camera.component.css']
})
export class SpeciesCameraComponent implements OnInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  especieDetectada: string = 'Cargando...';
  model: tf.GraphModel | null = null;
  labels: string[] = [];

  async ngOnInit() {
    await this.cargarModelo();
    await this.iniciarCamara();
    this.bucleDeteccion();
  }

  async cargarModelo() {
    this.model = await tf.loadGraphModel('/assets/model/model.json');
    const response = await fetch('/assets/model/metadata.json');
    const metadata = await response.json();
    this.labels = metadata.labels;
  }

  async iniciarCamara() {
    const video = this.videoRef.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
  }

  async bucleDeteccion() {
    setInterval(() => this.detectar(), 1000);
  }

  async detectar() {
    if (!this.model) return;
    const video = this.videoRef.nativeElement;

    const tensor = tf.browser.fromPixels(video)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255)
      .expandDims();

    const predictions = this.model.predict(tensor) as tf.Tensor;
    const data = await predictions.data();
    const maxIndex = data.indexOf(Math.max(...data));
    this.especieDetectada = this.labels[maxIndex];
    tf.dispose(tensor);
  }

  async capturarFoto() {
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg');

    const especie = this.especieDetectada;
    this.subirAFirebase(base64, especie);
  }

  subirAFirebase(base64: string, especie: string) {
    const captura = {
      id: uuidv4(),
      especie,
      fecha: new Date().toISOString(),
      imagen: base64
    };
    console.log('Simulación de subida a Firebase', captura);
  }
}
