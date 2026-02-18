# ⚡ Quick Start - Autenticação com Firebase

> Começar em menos de 5 minutos!

---

## 1️⃣ Configurar Firebase (2 min)

### Passo 1: Criar Projeto
1. Acesse https://console.firebase.google.com
2. Clique "Criar Projeto"
3. Preencha nome e siga passos
4. Clique "Criar Projeto"

### Passo 2: Ativar Autenticação
1. No projeto, clique "Autenticação"
2. Clique "Começar"
3. Em "Provedores", clique "Email/Password"
4. Habilite "Email/Password"
5. Clique "Salvar"

### Passo 3: Copiar Credenciais
1. Clique ⚙️ (Configurações)
2. Abra aba "Apps"
3. Clique em "Web" ou adicione app web
4. **Copie o objeto config**

---

## 2️⃣ Configurar Projeto (1 min)

### Criar `.env.local`

Na raiz do projeto, crie arquivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

> Use o arquivo `.env.local.example` como referência

---

## 3️⃣ Rodar Aplicação (1 min)

```bash
npm run dev
```

A aplicação estará em `http://localhost:3000`

---

## 4️⃣ Testar (1 min)

### Acessar Página de Login
```
http://localhost:3000/auth
```

### Criar Nova Conta
1. Clique "Criar uma agora"
2. Preencha:
   - Nome: `João Silva`
   - Email: `joao@example.com`
   - Senha: `senha123`
   - Confirmar: `senha123`
3. Clique "Criar Conta"

### Fazer Login
1. Email: `joao@example.com`
2. Senha: `senha123`
3. Clique "Entrar"

### Acessar Dashboard
- Após login, será redirecionado automaticamente
- Ou acesse `http://localhost:3000/`

### Fazer Logout
1. Clique no ícone do usuário (canto superior direito)
2. Clique "Sair"

---

## 📝 Usar em Seu Código

### Hook `useAuth()`

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function MyComponent() {
  const { user, signIn, signOut, isAuthenticated } = useAuth();

  // Seu código aqui
}
```

### Proteger Rota

```tsx
'use client';

import { ProtectedRoute } from '@/app/modules/auth/presentation/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Conteúdo Protegido</h1>
    </ProtectedRoute>
  );
}
```

---

## 🎯 Pronto!

Seu projeto agora tem autenticação completa com Firebase! 🎉

### Próximos Passos:
- Leia `FIREBASE_AUTH_GUIDE.md` para documentação completa
- Leia `FIREBASE_AUTH_EXAMPLES.md` para mais exemplos
- Customize os formulários conforme necessário

---

## ❓ Problemas?

### Firebase não funciona
- Verifique se `.env.local` tem as credenciais corretas
- Verifique se Email/Password está habilitado no Firebase Console

### Não consigo fazer login
- Verifique se criou a conta primeiro (signup)
- Use a mesma senha que cadastrou

### Credenciais do Firebase não aparecem
- Vá para Project Settings > Apps > Web
- Copie o objeto config completo

---

## 📚 Mais Informações

- [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md) - Guia completo
- [FIREBASE_AUTH_EXAMPLES.md](./FIREBASE_AUTH_EXAMPLES.md) - Exemplos
- [Firebase Docs](https://firebase.google.com/docs/auth)

---

**Sucesso! 🚀**
