import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

import { auth } from 'src/firebaseClient';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        this.errorMessage = '';
        this.router.navigate(['/home']);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          this.errorMessage = 'Correo electrónico incorrecto';
        } else if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Verifica tus datos.';
        }
      }
    }
  }

  async loginWithGoogle() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión con Google.';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}