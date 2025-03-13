// states/auth/auth.state.ts
export interface AuthState {
  token: string | null;
  loading: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  token: null,
  loading: false,
  error: null
};
