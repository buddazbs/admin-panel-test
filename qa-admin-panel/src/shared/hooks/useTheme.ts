import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleTheme } from '../../app/slices/themeSlice';

interface UseThemeReturn {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkMode);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? 'dark' : 'light'
    );
  }, [isDarkTheme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return { isDarkTheme, toggleTheme: handleToggleTheme };
};