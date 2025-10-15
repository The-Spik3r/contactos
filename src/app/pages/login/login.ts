import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Loader],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  loged: boolean = false;
  isError: boolean = false;
  gonnaLogin: boolean = false;
  loginStep:
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'password'
    | 'processing'
    | 'error'
    | 'signup'
    | 'signup-processing'
    | 'signup-success' = 'email';
  isSignUpMode: boolean = false;
  messages: { [key: string]: string[] } = {
    messageSeems: [
      'Commencing System Check',
      'Memory Unit: Green',
      'Initializing Tactics Log',
      'Loading Geographic Data',
      'Vitals: Green',
      'Remaining MP: 100%',
      'Black Box Temperature: Normal',
      'Black Box Internal Pressure: Normal',
      'Activating IFF',
      'Activating FCS',
      'Initializing Pod Connection',
      'Launching DBU Setup',
      'Activating Inertia Control System',
      'Activating Environmental Sensors',
      'Equipment Authentication: FAILED',
    ],
    messageError: ['Error: Equipment Authentication Failed', 'Please contact support.'],
  };
  messageSeems: string[] = [];
  messageErrorSeems: string[] = [];

  constructor(private authService: Auth, private router: Router) {}

  async ngOnInit() {
    // Mostrar mensajes con delay
    for (let i = 0; i < this.messages['messageSeems'].length; i++) {
      setTimeout(() => {
        this.messageSeems.push(this.messages['messageSeems'][i]);

        // Después de 1.5 segundos (duración de la animación), remover el cursor
        setTimeout(() => {
          const elements = document.querySelectorAll('.messages-boots p');
          if (elements[i]) {
            elements[i].classList.add('typed');
          }
        }, 1500);
      }, i * 720);
    }

    // Esperar a que termine la secuencia
    await this.waitForListSize(this.messageSeems, this.messages['messageSeems'].length);

    for (let i = 0; i < this.messages['messageError'].length; i++) {
      setTimeout(() => {
        this.messageErrorSeems.push(this.messages['messageError'][i]);
      }, i * 720);
    }

    console.log('Secuencia de mensajes completada');

    await this.waitForListSize(this.messageErrorSeems, this.messages['messageError'].length, 10000);
    this.gonnaLogin = true;
    this.loginStep = 'email'; // Inicializar el flujo de login

    if (this.authService.isloggedin) {
      this.router.navigate(['/contacts']);
    }
  }

  onEmailSubmit() {
    if (this.email.trim()) {
      if (this.isSignUpMode) {
        this.loginStep = 'firstName';
      } else {
        this.loginStep = 'password';
      }
    }
  }

  onFirstNameSubmit() {
    if (this.firstName.trim()) {
      this.loginStep = 'lastName';
    }
  }

  onLastNameSubmit() {
    if (this.lastName.trim()) {
      this.loginStep = 'password';
    }
  }

  onPasswordSubmit() {
    if (this.password.trim()) {
      if (this.isSignUpMode) {
        this.loginStep = 'signup-processing';
        this.processSignUp();
      } else {
        this.loginStep = 'processing';
        this.processLogin();
      }
    }
  }

  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.loginStep = 'email';
  }

  async processSignUp() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await this.authService.signUp(
      this.firstName,
      this.lastName,
      this.email,
      this.password
    );
    if (res.success) {
      this.loginStep = 'signup-success';
      setTimeout(() => {
        this.isSignUpMode = false;
        this.email = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.loginStep = 'email';
      }, 3000);
    } else {
      this.isError = true;
      this.loginStep = 'error';
      this.email = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';

      setTimeout(() => {
        this.loginStep = 'email';
      }, 2000);
    }
  }

  async processLogin() {
    // Simular un pequeño delay para mostrar el estado de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await this.authService.signIn(this.email, this.password);
    if (res) {
      this.router.navigate(['/contacts']);
    } else {
      this.isError = true;
      this.loginStep = 'error';
      // Resetear campos para permitir nuevo intento
      this.email = '';
      this.password = '';

      // Después de 2 segundos, cambiar a email para permitir nuevo intento
      setTimeout(() => {
        this.loginStep = 'email';
      }, 2000);
    }
  }

  waitForListSize(list: string[], expectedSize: number, interval = 100): Promise<void> {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (list.length >= expectedSize) {
          clearInterval(check);
          resolve();
        }
      }, interval);
    });
  }
}
