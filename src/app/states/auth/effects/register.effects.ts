import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegisterActions from '../actions/register.actions';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import * as AuthActions from '../actions/auth.actions';
@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      mergeMap((action) =>
        this.loginService.register(action.name, action.email, action.password).pipe(
          map((user) =>
            RegisterActions.registerSuccess({ name: user.name, token: user.token })
          ),
          catchError(error => {
            const errorMsg = error.error?.title || error.error || 'Ocurrió un error';
            return of(RegisterActions.registerFailure({ error: errorMsg }));
          })
        )
      )
    )
  );



  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.registerSuccess),
        tap(({ name, token }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('name', name);
        }),
        map(({ name, token }) => AuthActions.loginSuccess({ userName: name, token }))

      )
  );

}
