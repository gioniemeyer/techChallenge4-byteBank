'use client';

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Hook useAuth - Fornece acesso fácil ao contexto de autenticação
 * Deve ser usado apenas dentro de componentes que estão dentro do AuthProvider
 */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }

  return context;
}
