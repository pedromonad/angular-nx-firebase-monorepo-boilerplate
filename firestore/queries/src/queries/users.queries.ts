import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Coin, User } from '@angular-nx-firebase-monorepo/firestore/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserQueries {
  firestore = inject(Firestore);

  upsertUserCoins(userId: string, coins: Coin[]) {
    return setDoc(
      doc(this.firestore, `users/${userId}`),
      { coins },
      { merge: true },
    );
  }

  getUser(userId: string) {
    return docData(doc(this.firestore, `users/${userId}`)) as Observable<User>;
  }
}
