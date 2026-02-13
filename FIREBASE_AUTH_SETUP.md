# 🔐 Autenticação com Firebase - Implementação Completa

## ✨ O que foi implementado

Uma solução completa de autenticação com Firebase, respeitando **Clean Architecture** e **Arquitetura Modular**.

---

## 📦 Novos Arquivos e Pastas

### Core (Domínio)
```
app/modules/auth/core/
├── entities/User.ts           # Entidades puras (User, AuthCredentials, SignUpData)
├── repositories/IAuthRepository.ts  # Interface do repositório
└── usecases/                  # Casos de uso isolados e testáveis
    ├── SignInUseCase.ts
    ├── SignUpUseCase.ts
    ├── SignOutUseCase.ts
    └── GetCurrentUserUseCase.ts
```

### Infrastructure (Implementações)
```
app/modules/auth/infrastructure/
└── repositories/FirebaseAuthRepository.ts  # Integração com Firebase
```

### Presentation (UI)
```
app/modules/auth/presentation/
├── providers/AuthProvider.tsx           # Context de autenticação
├── hooks/useAuth.ts                     # Hook para usar o contexto
└── components/
    ├── LoginForm.tsx                    # Formulário de login
    ├── SignUpForm.tsx                   # Formulário de cadastro
    ├── AuthPage.tsx                     # Página que alterna login/signup
    ├── ProtectedRoute.tsx               # Componente para proteger rotas
    └── index.ts                         # Exports
```

### Configuração
```
app/config/firebase.ts              # Inicialização do Firebase
.env.local.example                  # Template de variáveis de ambiente
```

### Documentação
```
FIREBASE_AUTH_GUIDE.md              # Guia completo de configuração e uso
```

### Componentes Atualizados
```
app/components/header-components/UserMenu.tsx  # Menu do usuário com logout
app/components/header-components/Header.tsx    # Integração do UserMenu
```

---

## 🚀 Como Começar

### 1. Instalar Dependências

Firebase já foi instalado automaticamente:
```bash
npm install firebase
```

### 2. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative "Email/Password" em Autenticação > Provedores
4. Copie as credenciais em Configurações do Projeto

### 3. Adicionar Credenciais

Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_dominio_aqui
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_aqui
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_aqui
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id_aqui
```

### 4. Testar

```bash
npm run dev
```

Acesse `http://localhost:3000/auth` para testar login/cadastro.

---

## 🏗️ Arquitetura

A implementação segue **Clean Architecture** com separação clara de camadas:

```
┌─────────────────────────────────────────────────────┐
│             PRESENTATION (UI/React)                 │
│  Componentes, Hooks, Context Providers              │
├─────────────────────────────────────────────────────┤
│         CORE (Lógica de Negócio - Pura)            │
│  Entidades, Casos de Uso, Interfaces               │
├─────────────────────────────────────────────────────┤
│      INFRASTRUCTURE (Implementações Técnicas)      │
│  Repositórios, APIs, Firebase                      │
└─────────────────────────────────────────────────────┘
```

### Benefícios

✅ **Independência:** Core não depende de Firebase ou React  
✅ **Testabilidade:** Casos de uso podem ser testados isoladamente  
✅ **Manutenibilidade:** Fácil trocar Firebase por outra solução  
✅ **Reutilização:** Código pode ser usado em diferentes interfaces  
✅ **Escalabilidade:** Fácil adicionar novos casos de uso  

---

## 💡 Como Usar

### Hook `useAuth()`

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function MyComponent() {
  const {
    user,              // Usuário autenticado
    loading,           // Carregando?
    error,             // Erro?
    isAuthenticated,   // Autenticado?
    signIn,            // Login
    signUp,            // Cadastro
    signOut,           // Logout
  } = useAuth();

  // ... seu código
}
```

### Proteger Rotas

```tsx
'use client';

import { ProtectedRoute } from '@/app/modules/auth/presentation/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Conteúdo protegido</h1>
    </ProtectedRoute>
  );
}
```

---

## 📄 Páginas Disponíveis

| URL | Descrição |
|---|---|
| `/` | Dashboard (protegido) |
| `/auth` | Página de autenticação |

---

## 🔄 Fluxo de Autenticação

1. Usuário acessa `/`
2. `ProtectedRoute` verifica se está autenticado
3. Se não: redireciona para login
4. Usuário faz login ou cadastro
5. `SignInUseCase`/`SignUpUseCase` validam dados
6. `FirebaseAuthRepository` comunica com Firebase
7. Firebase retorna usuário + token JWT
8. Token é salvo em `localStorage`
9. Contexto é atualizado
10. Usuário é redirecionado para dashboard

---

## 🔐 Segurança

- ✅ Senhas nunca são armazenadas em código
- ✅ Credenciais do Firebase em `.env.local` (não versionado)
- ✅ Tokens JWT gerenciados pelo Firebase
- ✅ Validação de email e senha no cliente e servidor
- ✅ Mensagens de erro genéricas para segurança
- ✅ Proteção de rotas automática

---

## 📚 Estrutura de Dados

### User (Entidade)
```typescript
{
  id: string;                 // UID do Firebase
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### AuthCredentials
```typescript
{
  email: string;
  password: string;
}
```

### SignUpData
```typescript
{
  email: string;
  password: string;
  displayName: string;
}
```

---

## 🧪 Casos de Uso

| Caso de Uso | Função | Validações |
|---|---|---|
| `SignInUseCase` | Login de usuário | Email válido, senha obrigatória |
| `SignUpUseCase` | Cadastro de novo usuário | Email válido, senha min 6 char, nome obrigatório |
| `SignOutUseCase` | Logout | Sem validações |
| `GetCurrentUserUseCase` | Obter usuário atual | Sem validações |

---

## 🎯 Componentes da UI

### LoginForm
- Formulário de login com email/senha
- Validação em tempo real
- Mensagens de erro
- Botão para trocar para cadastro

### SignUpForm
- Formulário de cadastro com nome/email/senha
- Confirmação de senha
- Validações de força de senha
- Botão para trocar para login

### AuthPage
- Alterna entre LoginForm e SignUpForm
- Gerencia estado de visualização

### ProtectedRoute
- Protege rotas que requerem autenticação
- Mostra spinner enquanto carrega
- Redireciona para login se não autenticado

### UserMenu
- Menu do usuário no header
- Mostra informações do usuário
- Botão de logout

---

## 📞 Métodos do Hook `useAuth()`

```typescript
// Fazer login
await signIn({ email, password });

// Fazer cadastro
await signUp({ email, password, displayName });

// Fazer logout
await signOut();

// Limpar mensagem de erro
clearError();
```

---

## 🐛 Tratamento de Erros

Todos os erros do Firebase são traduzidos para português:

```
"Email já está em uso"
"Senha incorreta"
"Usuário não encontrado"
"Senha muito fraca"
"Muitas tentativas. Tente mais tarde."
```

---

## 📋 Checklist de Configuração

- [ ] Instalar Firebase (`npm install firebase`)
- [ ] Criar projeto em Firebase Console
- [ ] Ativar Email/Password em Autenticação
- [ ] Copiar credenciais do Firebase
- [ ] Criar arquivo `.env.local`
- [ ] Adicionar credenciais ao `.env.local`
- [ ] Rodar `npm run dev`
- [ ] Acessar `http://localhost:3000/auth`
- [ ] Testar cadastro
- [ ] Testar login
- [ ] Testar logout

---

## 🔮 Próximos Passos (Opcional)

1. Adicionar verificação de email
2. Implementar reset de senha
3. Login com provedores (Google, GitHub, etc)
4. Autenticação de dois fatores
5. Perfis de usuário estendidos no Firestore

---

## 📖 Documentação Completa

Veja [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md) para documentação detalhada.

---

## 🎉 Pronto!

A autenticação está totalmente integrada e pronta para uso. Qualquer dúvida, consulte o guia completo.
