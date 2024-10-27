import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserCoinsEffects} from './user-coins.effects';
import {UserCoinsActions} from './user-coins.actions';
import {UserResourcesAbstract} from './user-coins.resources';
import {cold, hot} from 'jasmine-marbles';
import {Router} from '@angular/router';

describe('UserCoinsEffects', () => {
  const initialState = [];
  let effects: UserCoinsEffects;
  let actions$: Observable<Action>;
  let userResources: UserResourcesAbstract;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserCoinsEffects,
        provideMockActions(() => actions$),
        {provide: UserResourcesAbstract, useValue: {
           getUserCoins: jest.fn(),
            setUserCoins: jest.fn(),
          }},
        {provide: Router, useValue: {}},
        { provide: Store, useValue: {}}
      ],
    });

    effects = TestBed.inject(UserCoinsEffects);
    userResources = TestBed.inject(UserResourcesAbstract);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUserCoins$', () => {
    it('should return loadUsersCoinsSuccess action, with coins, on success', () => {
      const coins = [{ id: 'BTC' } ,{ id: 'USD' }];
      const action = UserCoinsActions.loadUsersCoins();
      const outcome = UserCoinsActions.loadUsersCoinsSuccess({ coins });

      actions$ = hot('-a', {a: action});
      const response = cold('-b|', {b: coins});
      const expected = cold('--c', {c: outcome});
      userResources.getUserCoins = jest.fn(() => response);

      expect(effects.loadUserCoins$).toBeObservable(expected);
    });

    it('should fail with loadUserCoinsFailure action, when service throws', () => {
      const action = UserCoinsActions.loadUsersCoins();
      const error = new Error('Error!');
      const outcome = UserCoinsActions.loadUserCoinsFailure({ error: error.message });

      actions$ = hot('-a', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: outcome});
      userResources.getUserCoins = jest.fn(() => response);

      expect(effects.loadUserCoins$).toBeObservable(expected);
    });
  });
});
