'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

type AuthView = 'login' | 'signup';

interface AuthPageProps {
  initialView?: AuthView;
  onAuthSuccess?: () => void;
}

/**
 * AuthPage - Componente que alterna entre Login e SignUp
 * Gerencia a visualização baseada no estado local
 */

export function AuthPage({ initialView = 'login', onAuthSuccess }: AuthPageProps) {
  const [view, setView] = useState<AuthView>(initialView);

  const handleLoginSuccess = () => {
    onAuthSuccess?.();
  };

  const handleSignUpSuccess = () => {
    onAuthSuccess?.();
  };

  return (
    <>
      {view === 'login' ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignUp={() => setView('signup')}
        />
      ) : (
        <SignUpForm
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </>
  );
}
