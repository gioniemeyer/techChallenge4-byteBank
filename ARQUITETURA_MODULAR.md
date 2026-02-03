# 🎨 ARQUITETURA MODULAR - ByteBank

**Implementação de Padrões Modulares Complementando Clean Architecture**

---

## 📚 O Que é Arquitetura Modular?

Arquitetura Modular é um padrão de organização de código que complementa Clean Architecture, estruturando o projeto em **módulos independentes e bem definidos**.

Cada módulo:
- ✅ É **auto-contido** (contém tudo que precisa)
- ✅ Tem **responsabilidade única** (um domínio específico)
- ✅ Expõe apenas uma **interface pública** (via index.ts)
- ✅ **Não conhece detalhes** internos de outros módulos
- ✅ Segue estrutura **consistente** com os outros módulos

---

## 🏗️ Estrutura Modular Implementada

```
app/modules/
│
├── transactions/                    (Módulo: Gerenciar Transações)
│   ├── core/                       (Lógica de negócio)
│   │   ├── entities/               (Modelos)
│   │   ├── repositories/           (Interfaces)
│   │   └── usecases/               (Casos de uso)
│   ├── infrastructure/             (Implementação técnica)
│   │   └── repositories/           (Implementações)
│   ├── presentation/               (UI)
│   │   └── hooks/                  (Hooks React)
│   └── index.ts                    ✅ Barrel Export
│
├── user/                           (Módulo: Gerenciar Usuário)
│   ├── core/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── usecases/
│   ├── infrastructure/
│   │   └── repositories/
│   ├── presentation/
│   │   └── hooks/
│   └── index.ts                    ✅ Barrel Export
│
├── investments/                    (Módulo: Gerenciar Investimentos)
│   ├── core/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── usecases/
│   ├── infrastructure/
│   │   └── repositories/
│   ├── presentation/
│   │   └── hooks/
│   └── index.ts                    ✅ Barrel Export
│
└── shared/                         (Módulo: Compartilhado)
    ├── core/
    │   └── errors/                 (Erros comuns)
    ├── infrastructure/
    │   └── (Serviços compartilhados)
    ├── presentation/
    │   └── (Componentes compartilhados)
    └── index.ts                    ✅ Barrel Export
```

---

## 🎯 Princípios da Arquitetura Modular

### 1. **Independência de Módulos**
Cada módulo é independente e **não conhece a implementação** dos outros.

```typescript
// ❌ ERRADO - Acesso a estrutura interna
import { InMemoryTransactionRepository } 
  from "@/app/modules/transactions/infrastructure/repositories/InMemoryTransactionRepository";

// ✅ CORRETO - Usar index.ts
import { Transaction, useTransactionManagement } 
  from "@/app/modules/transactions";
```

### 2. **Interface Pública Clara**
Cada módulo expõe via **index.ts** o que é público.

```typescript
// modules/transactions/index.ts
export { Transaction } from "./core/entities/Transaction";
export { useTransactionManagement } from "./presentation/hooks/useTransactionManagement";
// Interno (não exportado)
// DIContainer é privado
```

### 3. **Hierarquia de Dependências**
Os módulos seguem uma hierarquia clara de dependências:

```
shared/                      ← Todos podem depender
  ↑
transactions/, user/, investments/   ← Podem depender de shared
```

**Regra Importante:** Um módulo **NÃO PODE depender de outro módulo de negócio**.

```typescript
// ❌ ERRADO
// transactions/core/usecases/SomeUseCase.ts
import { User } from "@/app/modules/user";

// ✅ CORRETO - Se precisar de usuário, passe como parâmetro
// transactions/core/usecases/SomeUseCase.ts
export class SomeUseCase {
  execute(user: User) { // User vem como parâmetro
    // ...
  }
}
```

### 4. **Estrutura Consistente**
Todos os módulos seguem a mesma estrutura:

```
module/
├── core/           (Lógica pura)
│   ├── entities/
│   ├── repositories/ (interfaces)
│   └── usecases/
├── infrastructure/ (Implementação técnica)
│   └── repositories/ (implementações)
├── presentation/   (UI)
│   └── hooks/
└── index.ts        (Exporta interface pública)
```

---

## 📦 Como Usar os Módulos

### Importar do Índice (Correto)

```typescript
// ✅ Importar do index.ts do módulo
import { 
  Transaction, 
  useTransactionManagement,
  ValidationError 
} from "@/app/modules/transactions";

export default function MyComponent() {
  const { transactions, addTransaction } = useTransactionManagement();
  
  return (
    // seu componente
  );
}
```

### O Que Cada Módulo Exporta

#### **transactions/**
```typescript
// Entities
export { Transaction, type ITransaction }

// Repositories (Interface)
export type { ITransactionRepository }

// Use Cases
export { GetTransactionsUseCase }
export { AddTransactionUseCase }
export { EditTransactionUseCase }
export { DeleteTransactionUseCase }

// Errors
export { ValidationError, NotFoundError }

// Infrastructure
export { InMemoryTransactionRepository }

// Presentation
export { useTransactionManagement }
```

#### **user/**
```typescript
// Entities
export { User, type IUser }

// Repositories (Interface)
export type { IUserRepository }

// Use Cases
export { GetCurrentUserUseCase }

// Infrastructure
export { InMemoryUserRepository }

// Presentation
export { useUser }
```

#### **investments/**
```typescript
// Entities
export { Investment, type IInvestment }

// Repositories (Interface)
export type { IInvestmentRepository }

// Use Cases
export { GetInvestmentsUseCase }

// Infrastructure
export { InMemoryInvestmentRepository }

// Presentation
export { useInvestments }
```

#### **shared/**
```typescript
// Errors (compartilhado entre todos)
export { DomainError, ValidationError, NotFoundError }
```

---

## 🔄 Fluxo de Dependências

```
Componentes React
      ↓
Hooks de Apresentação (useTransactionManagement)
      ↓
DIContainer (Resolve dependências do módulo)
      ↓
Use Cases (Lógica de negócio)
      ↓
Repositórios (Interfaces)
      ↓
Implementações (InMemory/API/BD)
      ↓
Entidades
      ↓
Erros Compartilhados (shared/)
```

---

## 📝 Exemplos de Uso

### Exemplo 1: Usar Transações em um Componente

```tsx
"use client";

import { useTransactionManagement, Transaction } 
  from "@/app/modules/transactions";

export default function TransactionList() {
  const { transactions, loading, error, deleteTransaction } 
    = useTransactionManagement();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {transactions.map((tx: Transaction) => (
        <div key={tx.id}>
          <span>{tx.getFormattedValue()}</span>
          <button onClick={() => deleteTransaction(tx.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Exemplo 2: Usar Usuário em um Componente

```tsx
"use client";

import { useUser } from "@/app/modules/user";

export default function UserProfile() {
  const { user, loading } = useUser();

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Salário: {user?.getFormattedSalary()}</p>
    </div>
  );
}
```

### Exemplo 3: Testar um Caso de Uso

```typescript
import { AddTransactionUseCase, InMemoryTransactionRepository } 
  from "@/app/modules/transactions";

describe("AddTransactionUseCase", () => {
  it("should add a transaction", async () => {
    const repo = new InMemoryTransactionRepository();
    const useCase = new AddTransactionUseCase(repo);

    const result = await useCase.execute({
      date: new Date().toISOString(),
      type: "Depósito",
      value: 100,
    });

    expect(result.id).toBeDefined();
  });
});
```

---

## 🚀 Benefícios da Arquitetura Modular

### ✅ **Organização Clara**
Cada módulo é uma unidade lógica independente.

### ✅ **Facilita Manutenção**
Problemas ficam isolados em um módulo.

### ✅ **Escalabilidade**
Fácil adicionar novos módulos sem quebrar nada.

### ✅ **Reutilização**
Módulos podem ser reutilizados em outros projetos.

### ✅ **Testabilidade**
Cada módulo pode ser testado independentemente.

### ✅ **Separação de Responsabilidades**
Cada módulo tem responsabilidade clara.

### ✅ **Facilita Trabalho em Equipe**
Diferentes times podem trabalhar em módulos diferentes sem conflitos.

---

## 📋 Regras de Arquitetura Modular

1. ✅ **Importe sempre do index.ts do módulo**
   ```typescript
   // ✅ Correto
   import { Transaction } from "@/app/modules/transactions";
   
   // ❌ Errado
   import { Transaction } from "@/app/modules/transactions/core/entities/Transaction";
   ```

2. ✅ **Cada módulo tem estrutura consistente**
   ```
   module/
   ├── core/
   ├── infrastructure/
   ├── presentation/
   └── index.ts
   ```

3. ✅ **Módulos de negócio NÃO dependem uns dos outros**
   ```typescript
   // ❌ transactions não deve conhecer user
   // ❌ user não deve conhecer investments
   ```

4. ✅ **Todos podem depender de shared/**
   ```typescript
   // ✅ Correto
   import { ValidationError } from "@/app/modules/shared";
   ```

5. ✅ **Exponha apenas a interface pública**
   ```typescript
   // index.ts exporta entidades, hooks, casos de uso
   // Mas NÃO exporta DIContainer, implementações internas
   ```

---

## 🔍 Estrutura de Pastas Detalhada

```
app/modules/

├── transactions/
│   ├── core/
│   │   ├── entities/
│   │   │   └── Transaction.ts
│   │   ├── repositories/
│   │   │   └── ITransactionRepository.ts
│   │   ├── usecases/
│   │   │   ├── GetTransactionsUseCase.ts
│   │   │   ├── AddTransactionUseCase.ts
│   │   │   ├── EditTransactionUseCase.ts
│   │   │   └── DeleteTransactionUseCase.ts
│   │   └── (errors importados de shared)
│   ├── infrastructure/
│   │   └── repositories/
│   │       └── InMemoryTransactionRepository.ts
│   ├── presentation/
│   │   └── hooks/
│   │       └── useTransactionManagement.ts
│   └── index.ts ← Interface Pública
│
├── user/
│   ├── core/
│   │   ├── entities/
│   │   │   └── User.ts
│   │   ├── repositories/
│   │   │   └── IUserRepository.ts
│   │   └── usecases/
│   │       └── GetCurrentUserUseCase.ts
│   ├── infrastructure/
│   │   └── repositories/
│   │       └── InMemoryUserRepository.ts
│   ├── presentation/
│   │   └── hooks/
│   │       └── useUser.ts
│   └── index.ts ← Interface Pública
│
├── investments/
│   ├── core/
│   │   ├── entities/
│   │   │   └── Investment.ts
│   │   ├── repositories/
│   │   │   └── IInvestmentRepository.ts
│   │   └── usecases/
│   │       └── GetInvestmentsUseCase.ts
│   ├── infrastructure/
│   │   └── repositories/
│   │       └── InMemoryInvestmentRepository.ts
│   ├── presentation/
│   │   └── hooks/
│   │       └── useInvestments.ts
│   └── index.ts ← Interface Pública
│
└── shared/
    ├── core/
    │   └── errors/
    │       └── DomainErrors.ts
    ├── infrastructure/
    │   └── (serviços compartilhados futuros)
    ├── presentation/
    │   └── (componentes compartilhados futuros)
    └── index.ts ← Interface Pública
```

---

## 🎯 Comparação: Antes vs Depois

### ANTES (Sem Arquitetura Modular)

```
app/
├── core/
│   ├── entities/
│   │   ├── Transaction.ts
│   │   ├── User.ts
│   │   └── Investment.ts
│   ├── repositories/
│   │   ├── ITransactionRepository.ts
│   │   ├── IUserRepository.ts
│   │   └── IInvestmentRepository.ts
│   └── usecases/
│       ├── transaction/
│       ├── user/
│       └── investment/
├── infrastructure/
│   └── repositories/
│       ├── InMemoryTransactionRepository.ts
│       ├── InMemoryUserRepository.ts
│       └── InMemoryInvestmentRepository.ts
├── presentation/
│   └── hooks/
│       ├── useTransactionManagement.ts
│       ├── useUser.ts
│       └── useInvestments.ts
└── di/
    └── DIContainer.ts
```

**Problemas:**
- ❌ Difícil de navegar
- ❌ Não fica claro o que pertence a qual domínio
- ❌ Difícil reutilizar em outro projeto

### DEPOIS (Com Arquitetura Modular)

```
app/modules/
├── transactions/ ← Tudo sobre transações aqui
├── user/ ← Tudo sobre usuário aqui
├── investments/ ← Tudo sobre investimentos aqui
└── shared/ ← Código compartilhado aqui
```

**Benefícios:**
- ✅ Fácil de navegar
- ✅ Fica claro o que é de cada domínio
- ✅ Fácil reutilizar em outro projeto

---

## 🧩 Adicionar um Novo Módulo

Quando precisar adicionar um novo módulo, siga este template:

### Passo 1: Criar Estrutura

```
app/modules/payments/
├── core/
│   ├── entities/
│   │   └── Payment.ts
│   ├── repositories/
│   │   └── IPaymentRepository.ts
│   └── usecases/
│       └── ProcessPaymentUseCase.ts
├── infrastructure/
│   └── repositories/
│       └── InMemoryPaymentRepository.ts
├── presentation/
│   └── hooks/
│       └── usePayments.ts
└── index.ts
```

### Passo 2: Criar index.ts

```typescript
// modules/payments/index.ts
export { Payment } from "./core/entities/Payment";
export type { IPaymentRepository } from "./core/repositories/IPaymentRepository";
export { ProcessPaymentUseCase } from "./core/usecases/ProcessPaymentUseCase";
export { InMemoryPaymentRepository } from "./infrastructure/repositories/InMemoryPaymentRepository";
export { usePayments } from "./presentation/hooks/usePayments";
```

### Passo 3: Usar em Componentes

```typescript
import { usePayments } from "@/app/modules/payments";

export default function PaymentComponent() {
  const { payments } = usePayments();
  // ...
}
```

---

## 🔗 Integração com DIContainer

O DIContainer **mantém a compatibilidade** com ambas as estruturas:

```typescript
// app/di/DIContainer.ts continua funcionando
const container = DIContainer.getInstance();
const useCase = container.getGetTransactionsUseCase();

// Componentes usam o novo módulo através dos hooks
import { useTransactionManagement } from "@/app/modules/transactions";
```

Durante a transição, os dois funcionam juntos!

---

## ✨ Próximas Fases

### Fase 1: Usar os Novos Módulos
- Refatore componentes para importar de `@/app/modules/transactions` etc
- Remova imports da estrutura antiga

### Fase 2: Remover Estrutura Antiga
- Após todos os componentes refatorados
- Remova pastas antigas: `app/core`, `app/infrastructure`, `app/presentation`

### Fase 3: Adicionar Novos Módulos
- Seguindo o template acima
- Um módulo por feature
- Compartilhe em `shared/` o que for comum

---

## 📊 Status da Implementação

- [x] Estrutura modular criada
- [x] Módulo transactions implementado
- [x] Módulo user implementado
- [x] Módulo investments implementado
- [x] Módulo shared implementado
- [x] Barrel exports criados
- [ ] Componentes refatorados para usar novos módulos
- [ ] Estrutura antiga removida (após refatoração)

---

## 🎉 Resumo

**Arquitetura Modular** organiza seu código em módulos independentes, cada um com sua estrutura clara e interface pública bem definida.

**Benefícios:**
- Organização clara
- Fácil manutenção e escalabilidade
- Trabalho em equipe facilitado
- Reutilização entre projetos

**Regra de Ouro:** Sempre importe do `index.ts` do módulo!

```typescript
// ✅ Correto
import { useTransactionManagement } from "@/app/modules/transactions";

// ❌ Errado
import { useTransactionManagement } from "@/app/modules/transactions/presentation/hooks/useTransactionManagement";
```

---

**Implementado em:** 2 de Fevereiro de 2026  
**Status:** ✅ Completo e Pronto para Usar
