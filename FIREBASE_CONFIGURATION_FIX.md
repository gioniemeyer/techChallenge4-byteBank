# 🔧 CONFIGURAÇÃO DO FIREBASE - Passo a Passo

## ❌ Erro Recebido:
```
Firebase: Error (auth/configuration-not-found)
```

**Causa:** As credenciais do Firebase não foram configuradas corretamente.

---

## ✅ Solução Rápida (3 passos):

### 1️⃣ Obter Credenciais (2 min)

**Acesse:** https://console.firebase.google.com

**Siga:**
1. Clique em seu projeto (ou crie um novo)
2. Vá para **⚙️ Project Settings** (canto superior esquerdo)
3. Abra a aba **Apps**
4. Clique no ícone **Web** (`</>`)
5. Copie o objeto `firebaseConfig`

**Você verá algo assim:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123xyz...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123xyz..."
};
```

### 2️⃣ Criar `.env.local` (1 min)

**Na raiz do seu projeto**, crie arquivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123xyz
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123xyz
```

> **Use o arquivo `.env.local.example` como referência!**

### 3️⃣ Reiniciar Servidor (30 seg)

```bash
# Interrompa o servidor com Ctrl+C
# Depois rode:
npm run dev
```

---

## 📍 Localização Correta

O arquivo `.env.local` **DEVE estar** na raiz do projeto:

```
techChallenge4-byteBank/
├── .env.local                    ← AQUI! (novo arquivo)
├── .env.local.example            (template)
├── package.json
├── tsconfig.json
├── next.config.ts
├── app/
│   ├── modules/
│   │   └── auth/
│   ├── config/
│   │   └── firebase.ts
│   └── ...
└── ...
```

---

## ⚠️ Checklist de Verificação

- [ ] Arquivo se chama `.env.local` (sem .example)
- [ ] Está na raiz do projeto (mesmo nível do package.json)
- [ ] Todas as 6 variáveis estão preenchidas
- [ ] Valores copiados corretamente do Firebase Console
- [ ] Servidor foi reiniciado após criar o arquivo
- [ ] Firebase > Autenticação > Email/Password está **habilitado**

---

## 🔍 Como Verificar se Funcionou

### No Terminal:
```bash
npm run dev
```

Procure por mensagens de erro sobre Firebase. Se não houver, está OK!

### No DevTools (F12):
1. Abra **Console**
2. Se ver mensagem de warning sobre Firebase não configurado, significa que `.env.local` não foi lido corretamente

### Testando Login:
1. Acesse `http://localhost:3000/auth`
2. Tente fazer login
3. Se o erro "configuration-not-found" desaparecer, está funcionando!

---

## 🚨 Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `configuration-not-found` | `.env.local` não configurado ou não existe | Crie `.env.local` com credenciais |
| Variáveis vazias | Valores não foram copiados | Verifique Firebase Console |
| Arquivo não é lido | Está em lugar errado | Deve estar na raiz do projeto |
| "Email/Password not enabled" | Autenticação não ativada no Firebase | Vá em Autenticação > Provedores > Ative Email/Password |

---

## 📱 Exemplo Completo de `.env.local`

```env
# Exemplo com valores fictícios (substitua pelos seus):

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDqVgcab-Nging1234567890ABCDEFGH
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-app-123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-app-123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-app-123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=987654321
NEXT_PUBLIC_FIREBASE_APP_ID=1:987654321:web:abc123def456ghi789jkl
```

---

## ✅ Após Configurar

Seus usuários poderão:
- ✅ Fazer login com email/senha
- ✅ Fazer cadastro
- ✅ Fazer logout
- ✅ Acessar dashboard protegido

---

## 💡 Dica Final

Se ainda tiver erro, **reinicie completamente**:
1. Interrompa o servidor (`Ctrl+C`)
2. Feche o navegador
3. Rode `npm run dev` novamente
4. Acesse `localhost:3000` em aba nova

Às vezes Next.js precisa ler o arquivo `.env.local` novamente.

---

**Sucesso! 🚀**
