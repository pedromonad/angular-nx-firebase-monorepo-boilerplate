import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from './store/auth.actions';

@Component({
  selector: 'angular-nx-firebase-monorepo-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  auth = inject(Auth);
  router = inject(Router);
  store = inject(Store);
  async signIn() {
    this.store.dispatch(AuthActions.login());
  }
}
