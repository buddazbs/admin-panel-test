// useAuth.ts
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../../app/slices/authSlice';
import type { User, LoginRequest } from './types';

interface UseAuthReturn {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => void;
}

// Моковые данные пользователей
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
];

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(state => state.auth);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    dispatch(loginStart());

    try {
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 500));

      const foundUser = MOCK_USERS.find(
        u => u.username === credentials.username && credentials.password === 'password'
      ) as User | undefined;

      if (foundUser) {
        const mockToken = `mock-jwt-token-${foundUser.id}`;
        dispatch(loginSuccess({ user: foundUser, token: mockToken }));
        return true;
      } else {
        dispatch(loginFailure('Неверное имя пользователя или пароль'));
        return false;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
      dispatch(loginFailure(message));
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { user, isAuth: isAuthenticated, loading, error, login, logout };
};
