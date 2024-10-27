import { of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Coin } from '@angular-nx-firebase-monorepo/firestore/models';

@Injectable()
export class UserCoinsResourcesMock {
  getUserCoins() {
    return of([{ id: 'USD' }, { id: 'BTC' }]);
  }

  setUserCoins(coins: Coin[]) {
    return of(undefined);
  }
}
