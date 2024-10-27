import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Coin } from '@angular-nx-firebase-monorepo/firestore/models';

import { UserCoinsActions } from './user-coins.actions';

export const coinsFeatureKey = 'coins';

export type State = EntityState<Coin>;

export const adapter: EntityAdapter<Coin> = createEntityAdapter<Coin>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(UserCoinsActions.addUserCoin, (state, action) =>
    adapter.addOne(action.coin, state),
  ),
  on(UserCoinsActions.upsertUserCoin, (state, action) =>
    adapter.upsertOne(action.coin, state),
  ),
  on(UserCoinsActions.addUserCoins, (state, action) =>
    adapter.addMany(action.coins, state),
  ),
  on(UserCoinsActions.upsertUserCoins, (state, action) =>
    adapter.upsertMany(action.coins, state),
  ),
  on(UserCoinsActions.updateUserCoin, (state, action) =>
    adapter.updateOne(action.coin, state),
  ),
  on(UserCoinsActions.updateUserCoins, (state, action) =>
    adapter.updateMany(action.coins, state),
  ),
  on(UserCoinsActions.deleteUserCoin, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(UserCoinsActions.deleteUserCoins, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(UserCoinsActions.loadUsersCoinsSuccess, (state, action) =>
    adapter.setAll(action.coins, state),
  ),
  on(UserCoinsActions.clearUserCoins, (state) => adapter.removeAll(state)),
);

export const coinsFeature = createFeature({
  name: coinsFeatureKey,
  reducer,
  extraSelectors: ({ selectCoinsState }) => ({
    ...adapter.getSelectors(selectCoinsState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  coinsFeature;
