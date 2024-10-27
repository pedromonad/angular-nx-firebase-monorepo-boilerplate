import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';
import { AuthResourcesAbstract } from './auth.resources';

describe('AuthEffects', () => {
  let actions: ReplaySubject<Action>;
  let effects: AuthEffects;
  let router: Router;
  let authResources: AuthResourcesAbstract;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: AuthResourcesAbstract, useValue: { login: jest.fn() } },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router);
    authResources = TestBed.inject(AuthResourcesAbstract);
    actions = new ReplaySubject(1);
  });

  it('should perform login', () => {
    actions.next(AuthActions.login());

    effects.login$.subscribe((action) => {
      expect(action).toEqual(AuthActions.loginSuccess());
    });
  });

  it('should navigate to home page on successful login', () => {
    actions.next(AuthActions.loginSuccess());

    effects.loginSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
