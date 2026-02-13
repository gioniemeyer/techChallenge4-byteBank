# 🚀 INÍCIO RÁPIDO - Autenticação Firebase

## 📌 Comece Aqui!

### Se você tem **5 minutos**:
👉 Leia [QUICK_START.md](./QUICK_START.md)

### Se você quer **entender tudo**:
👉 Leia [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md)

### Se você quer **exemplos de código**:
👉 Leia [FIREBASE_AUTH_EXAMPLES.md](./FIREBASE_AUTH_EXAMPLES.md)

### Se você quer **saber o que foi feito**:
👉 Leia [README_FIREBASE.md](./README_FIREBASE.md)

---

## ⚡ 4 Passos Rápidos

### 1️⃣ Firebase Console
```
https://console.firebase.google.com
→ Novo Projeto
→ Email/Password (Autenticação)
→ Copiar Credenciais
```

### 2️⃣ Arquivo .env.local
```env
NEXT_PUBLIC_FIREBASE_API_KEY=cola_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cola_aqui
# ... resto das credenciais
```

### 3️⃣ Rodar App
```bash
npm run dev
```

### 4️⃣ Testar
```
http://localhost:3000/auth
```

---

## 📂 Arquivos Principais

| Arquivo | O que faz |
|---------|-----------|
| `app/modules/auth/` | Todo o código de autenticação |
| `app/config/firebase.ts` | Configuração do Firebase |
| `app/auth/page.tsx` | Página de login/cadastro |
| `.env.local.example` | Template de credenciais |

---

## 🎯 Usar em Seu Código

```tsx
'use client';

import { useAuth } from '@/app/modules/auth/presentation/hooks/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  
  // Seu código aqui
}
```

---

## 📖 Documentação

- [QUICK_START.md](./QUICK_START.md) - Comece em 5 minutos
- [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md) - Guia completo
- [FIREBASE_AUTH_EXAMPLES.md](./FIREBASE_AUTH_EXAMPLES.md) - Exemplos
- [README_FIREBASE.md](./README_FIREBASE.md) - Visão geral
- [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) - Verificação

---

**Tudo pronto! Configure Firebase e divirta-se! 🎉**
