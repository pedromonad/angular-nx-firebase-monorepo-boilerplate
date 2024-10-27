import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserCoinsEffects } from './user-coins.effects';

describe('UserCoinEffects', () => {
  let actions$: Observable<any>;
  let effects: UserCoinsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCoinsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UserCoinsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
