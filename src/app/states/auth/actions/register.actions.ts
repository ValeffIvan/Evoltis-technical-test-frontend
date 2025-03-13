import { createAction, props } from '@ngrx/store';
// Acción para iniciar el proceso de registro
export const register = createAction(
  '[Register] Register',
  props<{name:string, email: string, password: string }>()
);

// Acción que se dispara cuando el registro fue exitoso
export const registerSuccess = createAction(
  '[Register] Register Success',
  props<{ name: string, token: string }>()
);

// Acción que se dispara si algo falla (por ejemplo, usuario ya existe)
export const registerFailure = createAction(
  '[Register] Register Failure',
  props<{ error: string }>()
);
