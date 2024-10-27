import { Observable } from 'rxjs';

import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable()
export abstract class AuthResourcesAbstract {
  abstract login(): Observable<void>;
}

@Injectable()
export class AuthResources {
  private readonly auth = inject(Auth);

  login() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
