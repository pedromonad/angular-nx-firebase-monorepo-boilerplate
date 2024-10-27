import { of } from 'rxjs';
import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { UserCoinsComponent } from './features/user-coins/user-coins.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthComponent } from './features/auth/auth.component';
import { coinsFeature } from './features/user-coins/store/user-coins.reducer';
import { UserCoinsEffects } from './features/user-coins/store/user-coins.effects';
import {
  UserCoinsResources,
  UserResourcesAbstract,
} from './features/user-coins/store/user-coins.resources';
import { environment } from '../environments/environment';
import { UserCoinsResourcesMock } from './features/user-coins/store/user-coins.resources.mock';
import { NavigationComponent } from '@angular-nx-firebase-monorepo/utils/ui';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(coinsFeature),
      provideEffects([UserCoinsEffects]),
      {
        provide: UserResourcesAbstract,
        useClass: environment.mock
          ? UserCoinsResourcesMock
          : UserCoinsResources,
      },
    ],
    children: [
      {
        path: 'login',
        component: AuthComponent,
      },
      {
        path: '',
        component: NavigationComponent,
        canActivate: [environment.mock ? () => of(true) : AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
        children: [
          {
            path: '',
            children: [{ path: '', component: UserCoinsComponent }],
          },
        ],
      },
    ],
  },
];
