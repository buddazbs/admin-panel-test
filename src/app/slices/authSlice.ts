// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../entities/user/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Загружаем состояние из sessionStorage
const loadFromSession = (): AuthState => {
  try {
    const saved = sessionStorage.getItem('auth');
    if (saved) {
      const { user, token } = JSON.parse(saved);
      return {
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  } catch {
    // Игнорируем ошибки парсинга
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadFromSession();

export const authSlice = createSlice({
  name: '@@app/auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem('auth', JSON.stringify({ user: action.payload.user, token: action.payload.token }));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('auth');
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Обновляем sessionStorage
      const saved = sessionStorage.getItem('auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.user = action.payload;
        sessionStorage.setItem('auth', JSON.stringify(parsed));
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
