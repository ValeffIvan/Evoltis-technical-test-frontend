import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.loginService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess({userName: response.name, token: response.token })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ userName, token }) => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}
}
