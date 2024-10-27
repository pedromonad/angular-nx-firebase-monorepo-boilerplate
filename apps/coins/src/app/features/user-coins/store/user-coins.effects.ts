import { map, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { concatLatestFrom } from '@ngrx/operators';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchSwitchMapError } from '@angular-nx-firebase-monorepo/utils/rxjs';

import { UserCoinsActions } from './user-coins.actions';
import { selectAll } from './user-coins.reducer';
import { UserResourcesAbstract } from './user-coins.resources';

@Injectable()
export class UserCoinsEffects {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly userResources = inject(UserResourcesAbstract);

  loadUserCoins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserCoinsActions.loadUsersCoins),
      switchMap(() => {
        return this.userResources.getUserCoins();
      }),
      map((coins) => UserCoinsActions.loadUsersCoinsSuccess({ coins })),
      catchSwitchMapError((error: Error) =>
        UserCoinsActions.loadUserCoinsFailure({ error: error.message }),
      ),
    );
  });

  addUserCoin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserCoinsActions.addUserCoin),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([, coins]) => {
        return this.userResources
          .setUserCoins([...coins])
          .pipe(map(() => UserCoinsActions.addUserCoinSuccess()));
      }),
      catchSwitchMapError((error: Error) =>
        UserCoinsActions.addUserCoinFailure({ error: error.message }),
      ),
    );
  });

  deleteUserCoin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserCoinsActions.deleteUserCoin),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([{ id }, users]) => {
        return this.userResources
          .setUserCoins(users.filter((coin) => coin.id !== id))
          .pipe(map(() => UserCoinsActions.deleteUserCoinSuccess({ id })));
      }),
      catchSwitchMapError((error: Error) =>
        UserCoinsActions.deleteUserCoinFailure({ error: error.message }),
      ),
    );
  });

  constructor(private actions$: Actions) {}
}
