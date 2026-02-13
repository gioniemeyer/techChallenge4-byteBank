# 📚 Exemplos de Integração - Autenticação Firebase

Este arquivo mostra exemplos práticos de como usar a autenticação em diferentes cenários.

---

## 1️⃣ Usar o Hook `useAuth()` em um Componente

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function DashboardHeader() {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) {
    return <div>Faça login para continuar</div>;
  }

  return (
    <header>
      <h1>Bem-vindo, {user?.displayName || user?.email}</h1>
      <button onClick={signOut}>Sair</button>
    </header>
  );
}
```

---

## 2️⃣ Proteger uma Rota Inteira

```tsx
// app/dashboard/page.tsx
'use client';

import { ProtectedRoute } from '@/app/modules/auth/presentation/components/ProtectedRoute';
import { AuthPage } from '@/app/modules/auth/presentation/components/AuthPage';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  return (
    <ProtectedRoute fallback={<AuthPage />}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

---

## 3️⃣ Obter Informações do Usuário

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Usuário não autenticado</div>;
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nome:</strong> {user.displayName}</p>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email Verificado:</strong> {user.emailVerified ? 'Sim' : 'Não'}</p>
      <p><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
```

---

## 4️⃣ Formulário de Login Customizado

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';
import { useState } from 'react';

export function CustomLoginForm() {
  const { signIn, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signIn({ email, password });
      // Redirecionar ou fazer outra coisa
    } catch (err) {
      // Erro já foi capturado e exibido
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={loading}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        disabled={loading}
      />

      <button type="submit" disabled={loading || !email || !password}>
        {loading ? 'Entrando...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## 5️⃣ Redirecionamento Após Login

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/app/modules/auth/presentation/components/LoginForm';

export function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Se já está autenticado, redireciona
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleLoginSuccess = () => {
    // Redirecionar após sucesso
    router.push('/dashboard');
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
      onSwitchToSignUp={() => router.push('/signup')}
    />
  );
}
```

---

## 6️⃣ Verificar Autenticação Antes de Ação

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function TransactionComponent() {
  const { isAuthenticated, user } = useAuth();

  const handleTransaction = async () => {
    if (!isAuthenticated || !user) {
      alert('Você precisa estar logado para fazer uma transação');
      return;
    }

    // Fazer transação
    console.log(`Transação do usuário ${user.id}`);
  };

  return (
    <button onClick={handleTransaction} disabled={!isAuthenticated}>
      Fazer Transação
    </button>
  );
}
```

---

## 7️⃣ Usar Token JWT em Requisições

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function DataFetcher() {
  const { token } = useAuth();

  const fetchDataFromAPI = async () => {
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  return (
    <button onClick={fetchDataFromAPI}>
      Buscar Dados da API
    </button>
  );
}
```

---

## 8️⃣ Mostrar Diferentes Conteúdos Baseado em Autenticação

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function ConditionalContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Você está logado!</h1>
          <p>Conteúdo exclusivo para usuários autenticados</p>
        </div>
      ) : (
        <div>
          <h1>Faça login para acessar conteúdo exclusivo</h1>
          <a href="/auth">Ir para Login</a>
        </div>
      )}
    </div>
  );
}
```

---

## 9️⃣ Menu de Logout

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

export function UserMenuButton() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      handleMenuClose();
      router.push('/auth');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar>{user.email[0].toUpperCase()}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>
          <strong>{user.displayName || user.email}</strong>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  );
}
```

---

## 🔟 Validar Dados Antes de Fazer Login

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';
import { useState } from 'react';

export function SmartLoginForm() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!email) {
      errors.push('Email é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Email inválido');
    }

    if (!password) {
      errors.push('Senha é obrigatória');
    } else if (password.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signIn({ email, password });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {(error || validationErrors.length > 0) && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error && <p>{error}</p>}
          {validationErrors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={loading}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !email || !password}
      >
        {loading ? 'Entrando...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## 📞 Tratando Todos os Estados

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function CompleteAuthComponent() {
  const { user, loading, error, isAuthenticated, signOut } = useAuth();

  if (loading) {
    return <div>🔄 Carregando autenticação...</div>;
  }

  if (error) {
    return <div>❌ Erro: {error}</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>👤 Não autenticado. <a href="/auth">Fazer login</a></div>;
  }

  return (
    <div>
      <div>✅ Usuário autenticado</div>
      <p>Email: {user.email}</p>
      <p>Nome: {user.displayName}</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
```

---

## 💡 Boas Práticas

✅ **Sempre use `'use client'`** em componentes que usam `useAuth()`  
✅ **Sempre verifique `loading`** antes de exibir dados  
✅ **Sempre trate `error`** e exiba mensagens amigáveis  
✅ **Use `ProtectedRoute`** para proteger páginas inteiras  
✅ **Use `clearError()`** antes de novas operações  
✅ **Armazene o token** para requisições à API  
✅ **Nunca exponha** dados sensíveis em localStorage  

---

## 📋 Checklist de Integração

- [ ] Importe `useAuth` do módulo auth
- [ ] Use `'use client'` na declaração do componente
- [ ] Verifique `loading` antes de renderizar
- [ ] Trate o estado `error`
- [ ] Proteja rotas com `ProtectedRoute`
- [ ] Use o `token` em requisições de API
- [ ] Implemente logout
- [ ] Teste todos os fluxos

---

## 🚀 Próximas Integrações

1. **Integrar com API Backend**: Enviar token JWT em headers
2. **Sincronizar Dados**: Buscar dados adicionais do usuário após login
3. **Persistência Local**: Manter dados em localStorage
4. **Redirecionamentos Automáticos**: Redirecionar baseado em estado de auth
5. **Analytics**: Rastrear eventos de autenticação

