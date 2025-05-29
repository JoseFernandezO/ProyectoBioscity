import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

import { auth } from 'src/firebaseClient';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async registerWithEmail() {
    const { email, password } = this.registerForm.value;
    this.errorMessage = '';
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      const code = (error as FirebaseError).code;
      switch (code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Este correo ya está registrado';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Formato de correo inválido';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'La contraseña es muy débil';
          break;
        default:
          this.errorMessage = 'Error inesperado al registrarse';
      }
    }
  }

  async registerWithGoogle() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.errorMessage = 'Error al registrarse con Google';
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
