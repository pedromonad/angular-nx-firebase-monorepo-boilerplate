import { map, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchSwitchMapError } from '@angular-nx-firebase-monorepo/utils/rxjs';

import { AuthActions } from './auth.actions';
import { AuthResourcesAbstract } from './auth.resources';

@Injectable()
export class AuthEffects {
  private readonly router = inject(Router);
  private readonly userResources = inject(AuthResourcesAbstract);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        return this.userResources.login();
      }),
      map(() => AuthActions.loginSuccess()),
      catchSwitchMapError((error: Error) =>
        AuthActions.loginFailure({ error: error.message }),
      ),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions) {}
}
