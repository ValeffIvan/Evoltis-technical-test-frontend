import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegisterActions from '../actions/register.actions';
import { LoginService } from '../../../services/login/login.service';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  // Efecto para manejar el registro
  register$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(RegisterActions.register),
      mergeMap((action) =>
        this.loginService.register(action.name, action.email, action.password).pipe(
          map((user) => RegisterActions.registerSuccess({ name: user.name, token: user.token })),
          catchError((error) => of(RegisterActions.registerFailure({ error })))
        )
      )
    )
});


}
