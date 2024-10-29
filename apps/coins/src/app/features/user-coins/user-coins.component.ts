import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { UserQueries } from '@angular-nx-firebase-monorepo/firestore/queries';
import { Store } from '@ngrx/store';

import { UserCoinsActions } from './store/user-coins.actions';
import { selectAll } from './store/user-coins.reducer';

@Component({
  selector: 'angular-nx-firebase-monorepo-user-coins',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './user-coins.component.html',
  styleUrl: './user-coins.component.scss'
})
export class UserCoinsComponent implements OnInit {
  form = new FormGroup({
    coin: new FormControl('', { nonNullable: true })
  });
  userQueries = inject(UserQueries);
  auth = inject(Auth);
  store = inject(Store);
  coins = this.store.selectSignal(selectAll);

  deleteCoin(id: string) {
    this.store.dispatch(UserCoinsActions.deleteUserCoin({ id }));
  }
  addCoin(name: string) {
    this.store.dispatch(UserCoinsActions.addUserCoin({ coin: { id: name } }));
  }

  ngOnInit(): void {
    this.store.dispatch(UserCoinsActions.loadUsersCoins());
  }
}
