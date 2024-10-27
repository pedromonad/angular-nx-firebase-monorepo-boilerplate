import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Coin } from '@angular-nx-firebase-monorepo/firestore/models';

export const UserCoinsActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users Coins': emptyProps(),
    'Load Users Coins success': props<{ coins: Coin[] }>(),
    'Load User Coins failure': props<{ error: string }>(),
    'Add User Coin': props<{ coin: Coin }>(),
    'Add User Coin success': emptyProps(),
    'Add User Coin failure': props<{ error: string }>(),
    'Upsert User Coin': props<{ coin: Coin }>(),
    'Add User Coins': props<{ coins: Coin[] }>(),
    'Upsert User Coins': props<{ coins: Coin[] }>(),
    'Update User Coin': props<{ coin: Update<Coin> }>(),
    'Update User Coins': props<{ coins: Update<Coin>[] }>(),
    'Delete User Coin': props<{ id: string }>(),
    'Delete User Coin success': props<{ id: string }>(),
    'Delete User Coin failure': props<{ error: string }>(),
    'Delete User Coins': props<{ ids: string[] }>(),
    'Clear User Coins': emptyProps(),
  },
});
