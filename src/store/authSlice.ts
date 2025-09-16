import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  id: string;
  isActivated: boolean;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

// selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth.isAuth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
