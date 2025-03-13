export interface RegisterState {
  name: string | null;
  token: string | null;
  loading: boolean;
  error: any | null;
}

export const initialState: RegisterState = {
  name: null,
  token: null,
  error: null,
  loading: false,
};
