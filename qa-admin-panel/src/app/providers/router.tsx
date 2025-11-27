import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AuthPage } from '../../pages/auth/AuthPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { AutotestsPage } from '../../pages/autotests/AutotestsPage';
import { TestResultsPage } from '../../pages/test-results/TestResultsPage';
import { CallbackPage } from '../../pages/callback/CallbackPage';
import { AccountPage } from '../../pages/account/AccountPage';
import { useAuth } from '../../entities/user/useAuth';

// Компонент для защищенных маршрутов
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: ('admin' | 'user')[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuth, user } = useAuth();
  
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role as 'admin' | 'user')) {
    return <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>Доступ запрещен</h2>
      <p>У вас нет прав для просмотра этой страницы.</p>
    </div>;
  }
  
  return <>{children}</>;
};

// Компонент для страницы 404
const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>Страница не найдена</h2>
      <p>Запрашиваемая страница не существует.</p>
    </div>
  );
};

interface AppRouterProps {
  isAuth: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isAuth }) => {
  // `user` not used here; ProtectedRoute reads auth itself
  
  const routing = useRoutes([
    {
      path: '/',
      element: isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />,
    },
    {
      path: '/auth',
      element: !isAuth ? <AuthPage /> : <Navigate to="/dashboard" />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/autotests',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <AutotestsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/test-results',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <TestResultsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/callback',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'user']}>
          <CallbackPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/account',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'user']}>
          <AccountPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return routing;
};