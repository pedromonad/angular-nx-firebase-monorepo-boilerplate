import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth/API',
  events: {
    login: emptyProps(),
    'login success': emptyProps(),
    'login failure': props<{ error: string }>(),
  },
});
