# 📚 Guia de Uso - Clean Architecture

## 🏗️ Estrutura Implementada

```
app/
├── core/                          # Lógica de negócio pura (independente de React)
│   ├── entities/                  # Modelos de domínio
│   │   ├── Transaction.ts         # Entidade de transação com validações
│   │   ├── User.ts               # Entidade de usuário
│   │   └── Investment.ts         # Entidade de investimento
│   ├── repositories/             # Interfaces/contratos
│   │   ├── ITransactionRepository.ts
│   │   ├── IUserRepository.ts
│   │   └── IInvestmentRepository.ts
│   ├── usecases/                 # Regras de negócio (casos de uso)
│   │   ├── transaction/
│   │   │   ├── GetTransactionsUseCase.ts
│   │   │   ├── AddTransactionUseCase.ts
│   │   │   ├── EditTransactionUseCase.ts
│   │   │   └── DeleteTransactionUseCase.ts
│   │   ├── user/
│   │   │   └── GetCurrentUserUseCase.ts
│   │   └── investment/
│   │       └── GetInvestmentsUseCase.ts
│   └── errors/                   # Exceções de domínio
│
├── infrastructure/               # Implementações técnicas
│   └── repositories/            # Implementações dos repositórios
│       ├── InMemoryTransactionRepository.ts
│       ├── InMemoryUserRepository.ts
│       └── InMemoryInvestmentRepository.ts
│
├── presentation/                # UI e integração com React
│   └── hooks/                   # Hooks customizados para conectar casos de uso
│       ├── useTransactionManagement.ts
│       ├── useUser.ts
│       └── useInvestments.ts
│
└── di/
    └── DIContainer.ts           # Injeção de dependência centralizada
```

---

## ✅ Como Usar

### 1️⃣ **Usar o Hook de Transações**

```tsx
import { useTransactionManagement } from "@/app/presentation/hooks/useTransactionManagement";

export default function TransactionComponent() {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactionManagement();

  const handleAddTransaction = async () => {
    try {
      await addTransaction(
        new Date().toISOString(),
        "Depósito",
        150.00
      );
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>
          {tx.date} - {tx.type} - {tx.getFormattedValue()}
        </div>
      ))}
    </div>
  );
}
```

### 2️⃣ **Usar o Hook de Usuário**

```tsx
import { useUser } from "@/app/presentation/hooks/useUser";

export default function UserComponent() {
  const { user, loading, error } = useUser();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Salário: {user?.getFormattedSalary()}</p>
      <p>Conta: {user?.accountNumber}</p>
    </div>
  );
}
```

### 3️⃣ **Usar o Hook de Investimentos**

```tsx
import { useInvestments } from "@/app/presentation/hooks/useInvestments";

export default function InvestmentComponent() {
  const { investments, loading, error } = useInvestments();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {investments.map((inv) => (
        <div key={inv.id}>
          <h3>{inv.name}</h3>
          <p>Valor: {inv.getFormattedValue()}</p>
          <p>Rentabilidade: {inv.getFormattedProfitability()}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testando Casos de Uso

Os casos de uso podem ser testados sem dependências de React:

```typescript
import { AddTransactionUseCase } from "@/app/core/usecases/transaction/AddTransactionUseCase";
import { InMemoryTransactionRepository } from "@/app/infrastructure/repositories/InMemoryTransactionRepository";

describe("AddTransactionUseCase", () => {
  it("should add a valid transaction", async () => {
    const repository = new InMemoryTransactionRepository();
    const useCase = new AddTransactionUseCase(repository);

    const result = await useCase.execute({
      date: new Date().toISOString(),
      type: "Depósito",
      value: 100,
    });

    expect(result.id).toBeDefined();
    expect(result.value).toBe(100);
  });

  it("should throw error for invalid value", async () => {
    const repository = new InMemoryTransactionRepository();
    const useCase = new AddTransactionUseCase(repository);

    await expect(
      useCase.execute({
        date: new Date().toISOString(),
        type: "Depósito",
        value: -50,
      })
    ).rejects.toThrow("O valor da transação deve ser maior que 0");
  });
});
```

---

## 🔧 Adicionar Novo Caso de Uso

### Passo 1: Criar a Entidade (se necessário)
```typescript
// app/core/entities/NewEntity.ts
export class NewEntity {
  constructor(public id: number, public name: string) {}
}
```

### Passo 2: Criar Interface do Repositório
```typescript
// app/core/repositories/INewRepository.ts
import { NewEntity } from "../entities/NewEntity";

export interface INewRepository {
  getAll(): Promise<NewEntity[]>;
  getById(id: number): Promise<NewEntity | null>;
  add(entity: Omit<NewEntity, "id">): Promise<NewEntity>;
}
```

### Passo 3: Criar Use Case
```typescript
// app/core/usecases/new/GetNewEntitiesUseCase.ts
import { INewRepository } from "../../repositories/INewRepository";
import { NewEntity } from "../../entities/NewEntity";

export class GetNewEntitiesUseCase {
  constructor(private newRepository: INewRepository) {}

  async execute(): Promise<NewEntity[]> {
    return this.newRepository.getAll();
  }
}
```

### Passo 4: Criar Implementação do Repositório
```typescript
// app/infrastructure/repositories/InMemoryNewRepository.ts
import { INewRepository } from "../../core/repositories/INewRepository";
import { NewEntity } from "../../core/entities/NewEntity";

export class InMemoryNewRepository implements INewRepository {
  private entities: NewEntity[] = [];

  async getAll(): Promise<NewEntity[]> {
    return [...this.entities];
  }

  async getById(id: number): Promise<NewEntity | null> {
    return this.entities.find((e) => e.id === id) || null;
  }

  async add(entity: Omit<NewEntity, "id">): Promise<NewEntity> {
    const newEntity = new NewEntity(this.entities.length + 1, entity.name);
    this.entities.push(newEntity);
    return newEntity;
  }
}
```

### Passo 5: Atualizar DIContainer
```typescript
// No app/di/DIContainer.ts
import { InMemoryNewRepository } from "../infrastructure/repositories/InMemoryNewRepository";
import { GetNewEntitiesUseCase } from "../core/usecases/new/GetNewEntitiesUseCase";

export class DIContainer {
  private newRepository: InMemoryNewRepository;
  private getNewEntitiesUseCase: GetNewEntitiesUseCase;

  private constructor() {
    this.newRepository = new InMemoryNewRepository();
    this.getNewEntitiesUseCase = new GetNewEntitiesUseCase(this.newRepository);
  }

  public getGetNewEntitiesUseCase(): GetNewEntitiesUseCase {
    return this.getNewEntitiesUseCase;
  }
}
```

### Passo 6: Criar Hook Customizado (opcional)
```typescript
// app/presentation/hooks/useNewEntities.ts
import { useState, useCallback, useEffect } from "react";
import { NewEntity } from "@/app/core/entities/NewEntity";
import { DIContainer } from "@/app/di/DIContainer";

export function useNewEntities() {
  const [entities, setEntities] = useState<NewEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const diContainer = DIContainer.getInstance();

  useEffect(() => {
    const useCase = diContainer.getGetNewEntitiesUseCase();
    useCase.execute().then(setEntities).finally(() => setLoading(false));
  }, []);

  return { entities, loading };
}
```

---

## 🚀 Benefícios Obtidos

✅ **Testabilidade**: Casos de uso podem ser testados sem React  
✅ **Manutenibilidade**: Cada camada tem responsabilidade clara  
✅ **Reutilização**: Lógica pode ser usada em diferentes contextos  
✅ **Escalabilidade**: Fácil adicionar novas funcionalidades  
✅ **Flexibilidade**: Trocar implementação de repositório sem afetar UI  
✅ **Independência**: Framework agnóstico até a apresentação  

---

## 📝 Próximos Passos

1. ✅ Refatorar componentes para usar novos hooks
2. ✅ Adicionar testes unitários
3. ✅ Integrar com API real (substituir InMemoryRepository)
4. ✅ Adicionar tratamento de erros mais robusto
5. ✅ Implementar cache de dados
