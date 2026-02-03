# 🚀 GUIA DE MIGRAÇÃO - Arquitetura Modular

**Como refatorar seu projeto para usar os novos módulos**

---

## 📋 Passo a Passo

### Passo 1: Atualizar Imports de Transações

#### ANTES
```typescript
import { useTransactionManagement } 
  from "@/app/presentation/hooks/useTransactionManagement";
```

#### DEPOIS
```typescript
import { useTransactionManagement } 
  from "@/app/modules/transactions";
```

#### Componentes Afetados
- `TransactionForm.tsx`
- `Statement.tsx`
- `StatementItem.tsx`
- Qualquer componente que use transações

---

### Passo 2: Atualizar Imports de Usuário

#### ANTES
```typescript
import { useUser } 
  from "@/app/presentation/hooks/useUser";
```

#### DEPOIS
```typescript
import { useUser } 
  from "@/app/modules/user";
```

#### Componentes Afetados
- `UserComponent.tsx`
- `Header.tsx`
- Qualquer componente que mostre dados do usuário

---

### Passo 3: Atualizar Imports de Investimentos

#### ANTES
```typescript
import { useInvestments } 
  from "@/app/presentation/hooks/useInvestments";
```

#### DEPOIS
```typescript
import { useInvestments } 
  from "@/app/modules/investments";
```

#### Componentes Afetados
- `Investments.tsx`
- `Chart.tsx`
- `ValueCard.tsx`
- `ChartCard.tsx`

---

### Passo 4: Atualizar Imports de Erros

#### ANTES
```typescript
import { ValidationError, NotFoundError } 
  from "@/app/core/errors/DomainErrors";
```

#### DEPOIS
```typescript
import { ValidationError, NotFoundError } 
  from "@/app/modules/shared";
```

---

### Passo 5: Usar Entidades Diretamente

Se você usa as entidades diretamente, importe do módulo:

#### ANTES
```typescript
import { Transaction } 
  from "@/app/core/entities/Transaction";
```

#### DEPOIS
```typescript
import { Transaction } 
  from "@/app/modules/transactions";
```

---

## 🔄 Migração Completa de um Componente

### Exemplo: TransactionForm.tsx

#### ANTES
```tsx
"use client";

import { useTransactionManagement } 
  from "@/app/presentation/hooks/useTransactionManagement";
import { Transaction } 
  from "@/app/core/entities/Transaction";
import { ValidationError } 
  from "@/app/core/errors/DomainErrors";

export default function TransactionForm() {
  const { addTransaction } = useTransactionManagement();
  // resto do código...
}
```

#### DEPOIS
```tsx
"use client";

import { useTransactionManagement, Transaction, ValidationError } 
  from "@/app/modules/transactions";

export default function TransactionForm() {
  const { addTransaction } = useTransactionManagement();
  // resto do código...
}
```

---

## 📍 Ordem Recomendada de Migração

### Semana 1: Transações
1. [ ] Atualizar `TransactionForm.tsx`
2. [ ] Atualizar `Statement.tsx`
3. [ ] Atualizar `StatementItem.tsx`
4. [ ] Atualizar `Balance.tsx` (se usa transações)
5. [ ] Testar no navegador

### Semana 2: Usuário
1. [ ] Atualizar `UserComponent.tsx`
2. [ ] Atualizar `Header.tsx` (se usa usuário)
3. [ ] Atualizar componentes de perfil (se houver)
4. [ ] Testar no navegador

### Semana 3: Investimentos
1. [ ] Atualizar `Investments.tsx`
2. [ ] Atualizar `Chart.tsx`
3. [ ] Atualizar `ValueCard.tsx`
4. [ ] Atualizar `ChartCard.tsx`
5. [ ] Testar no navegador

### Semana 4: Limpeza
1. [ ] Remover estrutura antiga (se tudo funcionar)
2. [ ] Executar testes
3. [ ] Fazer build final

---

## ✅ Checklist de Migração

### Para Cada Arquivo Afetado

- [ ] Atualizar imports
- [ ] Remover imports antigos
- [ ] Testar no navegador
- [ ] Testar funcionalidade
- [ ] Remover código comentado
- [ ] Fazer commit no git

---

## 🔍 Verificar Migração

### Script para Encontrar Imports Antigos

```bash
# Encontrar imports da estrutura antiga
grep -r "from \"@/app/presentation/hooks" app/components/
grep -r "from \"@/app/core/entities" app/components/
grep -r "from \"@/app/core/errors" app/components/
grep -r "from \"@/app/core/usecases" app/components/
```

### Script para Buscar Importações

```bash
# Ver quantos arquivos ainda usam estrutura antiga
grep -r "@/app/presentation/hooks" app/ | wc -l
grep -r "@/app/core/entities" app/ | wc -l
```

---

## 🐛 Troubleshooting

### Erro: "Module not found"

**Problema:** Componente importa de local errado

**Solução:** Verifique se está usando `@/app/modules/transactions` e não o caminho antigo

```typescript
// ❌ Errado
import { Transaction } 
  from "@/app/core/entities/Transaction";

// ✅ Correto
import { Transaction } 
  from "@/app/modules/transactions";
```

### Erro: "Cannot find name 'ValidationError'"

**Problema:** Erro não foi importado de `shared`

**Solução:**
```typescript
// ✅ Correto
import { ValidationError } 
  from "@/app/modules/shared";
```

### Erro: "useTransactionManagement is not a function"

**Problema:** Hook importado de local errado

**Solução:**
```typescript
// ✅ Correto
import { useTransactionManagement } 
  from "@/app/modules/transactions";
```

---

## 🧪 Testar Após Migração

```bash
# 1. Verificar se compila
npm run build

# 2. Rodar testes
npm run test

# 3. Iniciar dev
npm run dev

# 4. Testar no navegador
# - Adicionar transação
# - Editar transação
# - Deletar transação
# - Ver investimentos
# - Ver dados do usuário
```

---

## 📊 Progresso da Migração

### Status Inicial
```
✅ Módulos criados
✅ Código movido para módulos
❌ Componentes ainda usam estrutura antiga
❌ Estrutura antiga ainda existe
```

### Status Final (Após Migração)
```
✅ Módulos criados
✅ Código movido para módulos
✅ Componentes refatorados
✅ Estrutura antiga removida
```

---

## 🚀 Benefícios Após Migração

- ✅ Código mais organizado
- ✅ Imports mais claros
- ✅ Estrutura modular completa
- ✅ Fácil entender o projeto
- ✅ Fácil adicionar novos módulos

---

## 📝 Template de Commit

Ao fazer commit de uma migração:

```bash
git add app/components/MyComponent.tsx
git commit -m "refactor: migrate MyComponent to use @/app/modules/transactions"
```

---

## 🎯 Próximas Etapas

Após completar a migração:

1. **Remover estrutura antiga**
   ```
   rm -rf app/core/
   rm -rf app/infrastructure/
   rm -rf app/presentation/
   ```

2. **Adicionar novos módulos conforme necessário**
   ```
   Exemplo: app/modules/payments/
   ```

3. **Manter o DIContainer para compatibilidade interna**
   - Ainda usado por hooks internos
   - Pode ser removido depois se não necessário

---

## ✨ Conclusão

Após esta migração, seu projeto terá:
- ✅ **Arquitetura Modular** completa
- ✅ **Clean Architecture** mantida
- ✅ **Código organizado** por domínio
- ✅ **Escalabilidade** garantida

**Tempo estimado:** 1-2 semanas (20-30 horas)

---

**Versão:** 1.0  
**Data:** 2 de Fevereiro de 2026  
**Status:** Pronto para uso
