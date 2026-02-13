'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../modules/auth/presentation/hooks/useAuth';
import { AuthPage } from '../modules/auth/presentation/components/AuthPage';
import { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

/**
 * Página de Autenticação
 * Redireciona automaticamente para dashboard se já autenticado
 */

export default function AuthPageRoute() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return <AuthPage onAuthSuccess={() => router.push('/')} />;
}
