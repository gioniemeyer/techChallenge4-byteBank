'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { DIContainer } from '@/app/di/DIContainer';
import {
  User,
  AuthCredentials,
  SignUpData,
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  GetCurrentUserUseCase,
} from '../../index';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const diContainer = DIContainer.getInstance();

  // Inicializar verificando usuário autenticado
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const getCurrentUserUseCase = diContainer.resolve<GetCurrentUserUseCase>('GetCurrentUserUseCase');
        const currentUser = await getCurrentUserUseCase.execute();

        if (currentUser) {
          setUser(currentUser);
          // Obter token do armazenamento local se disponível
          const storedToken = localStorage.getItem('authToken');
          if (storedToken) {
            setToken(storedToken);
          }
        }
      } catch (err) {
        console.error('Erro ao inicializar autenticação:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [diContainer]);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    try {
      setError(null);
      const signInUseCase = diContainer.resolve<SignInUseCase>('SignInUseCase');
      const response = await signInUseCase.execute(credentials);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [diContainer]);

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      setError(null);
      const signUpUseCase = diContainer.resolve<SignUpUseCase>('SignUpUseCase');
      const response = await signUpUseCase.execute(data);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer cadastro';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [diContainer]);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      const signOutUseCase = diContainer.resolve<SignOutUseCase>('SignOutUseCase');
      await signOutUseCase.execute();

      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [diContainer]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    loading,
    error,
    isAuthenticated: user !== null,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
