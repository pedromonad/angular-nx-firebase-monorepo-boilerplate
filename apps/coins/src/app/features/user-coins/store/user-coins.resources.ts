import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from, map, take } from 'rxjs';

import { validUser } from '@angular-nx-firebase-monorepo/firestore/validators';
import { Coin } from '@angular-nx-firebase-monorepo/firestore/models';
import { UserQueries } from '@angular-nx-firebase-monorepo/firestore/queries';

@Injectable()
export abstract class UserResourcesAbstract {
  abstract getUserCoins(): Observable<Coin[]>;
  abstract setUserCoins(coins: Coin[]): Observable<void>;
}

@Injectable()
export class UserCoinsResources {
  private readonly userQueries = inject(UserQueries);
  private readonly auth = inject(Auth);

  getUserCoins() {
    return this.userQueries.getUser(this.auth.currentUser?.uid as string).pipe(
      take(1),
      map((user) => {
        validUser(user);
        return user.coins;
      }),
    );
  }

  setUserCoins(coins: Coin[]) {
    return from(
      this.userQueries.upsertUserCoins(
        this.auth.currentUser?.uid as string,
        coins,
      ),
    );
  }
}
