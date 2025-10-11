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
  loged: boolean = false;
  isError: boolean = false;
  gonnaLogin: boolean = false;
  loginStep: 'email' | 'password' | 'processing' | 'error' = 'email';
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
      this.loginStep = 'password';
    }
  }

  onPasswordSubmit() {
    if (this.password.trim()) {
      this.loginStep = 'processing';
      this.processLogin();
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
