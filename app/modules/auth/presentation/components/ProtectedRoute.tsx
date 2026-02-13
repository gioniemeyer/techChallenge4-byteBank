'use client';

import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { AuthPage } from './AuthPage';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ProtectedRoute - Componente que protege rotas que requerem autenticação
 * Se não autenticado, mostra a página de login
 * Se carregando, mostra spinner
 */

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return fallback || <AuthPage />;
  }

  return <>{children}</>;
}
