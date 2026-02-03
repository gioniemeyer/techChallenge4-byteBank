# Plano de Implementação - Clean Architecture

## 📋 Análise Atual

### Problemas Identificados:
1. **Lógica de negócio acoplada aos componentes React** - Context mistura estado com regras de negócio
2. **Falta de camadas separadas** - Componentes lidam com dados, UI e lógica simultaneamente
3. **Mocks e dados misturados** - Dados mock não estão separados da lógica
4. **Sem casos de uso (Use Cases)** - Operações não são isoladas e testáveis
5. **Difícil de testar** - Componentes dependem de múltiplas dependências externas
6. **Entidades não definidas claramente** - Tipos espalhados em vários arquivos

---

## 🏗️ Estrutura Clean Architecture Proposta

```
app/
├── core/                          # Essência da aplicação
│   ├── entities/                  # Modelos de domínio (independentes de frameworks)
│   │   ├── Transaction.ts
│   │   ├── User.ts
│   │   └── Investment.ts
│   │
│   ├── usecases/                  # Casos de uso - Regras de negócio
│   │   ├── transaction/
│   │   │   ├── AddTransactionUseCase.ts
│   │   │   ├── EditTransactionUseCase.ts
│   │   │   ├── DeleteTransactionUseCase.ts
│   │   │   └── GetTransactionsUseCase.ts
│   │   ├── user/
│   │   │   ├── GetUserUseCase.ts
│   │   │   └── UpdateUserUseCase.ts
│   │   └── investment/
│   │       └── GetInvestmentsUseCase.ts
│   │
│   ├── repositories/              # Interfaces (abstrações)
│   │   ├── ITransactionRepository.ts
│   │   ├── IUserRepository.ts
│   │   └── IInvestmentRepository.ts
│   │
│   └── errors/                    # Exceções de domínio
│       ├── ValidationError.ts
│       └── DomainError.ts
│
├── infrastructure/                # Implementações técnicas
│   ├── repositories/              # Implementação dos repositórios
│   │   ├── TransactionRepository.ts (em memória ou API)
│   │   ├── UserRepository.ts
│   │   └── InvestmentRepository.ts
│   │
│   ├── http/                      # Serviços HTTP (quando integrar API)
│   │   └── api-client.ts
│   │
│   └── storage/                   # Persistência local
│       └── localStorage.ts
│
├── presentation/                  # UI e Controllers (React)
│   ├── providers/                 # Context Providers (apenas estado da UI)
│   │   ├── TransactionProvider.tsx
│   │   ├── ResponsiveProvider.tsx
│   │   └── SidebarProvider.tsx
│   │
│   ├── hooks/                     # Custom hooks (conectam casos de uso ao React)
│   │   ├── useTransactionManagement.ts
│   │   ├── useUser.ts
│   │   └── useInvestments.ts
│   │
│   ├── components/                # Componentes presentacionais (atuais)
│   │   ├── buttons/
│   │   ├── central-components/
│   │   ├── header-components/
│   │   ├── investments/
│   │   ├── main-content/
│   │   ├── sidebar-components/
│   │   └── statement-components/
│   │
│   └── pages/                     # Páginas (routes)
│       └── page.tsx
│
├── mocks/                         # Dados para desenvolvimento/testes
│   ├── transactions-mock.ts
│   ├── users-mock.ts
│   └── investments-mock.ts
│
└── di/                            # Injeção de Dependência
    └── container.ts               # Configuração centralizada
```

---

## ✅ Implementação por Camada

### 1️⃣ **Camada de Entidades (Core - Entities)**
Modelos puros, sem dependências externas.

### 2️⃣ **Camada de Casos de Uso (Core - UseCases)**
Regras de negócio isoladas e testáveis.

### 3️⃣ **Camada de Repositórios (Core + Infrastructure)**
- **Interface** (Core): Define o contrato
- **Implementação** (Infrastructure): Como os dados são persistidos

### 4️⃣ **Camada de Apresentação (Presentation)**
- **Hooks customizados**: Conectam casos de uso ao React
- **Providers**: Gerenciam estado da UI
- **Componentes**: Apenas apresentação

### 5️⃣ **Injeção de Dependência**
Container centralizado para criar instâncias com todas as dependências.

---

## 🚀 Benefícios

✅ **Testabilidade** - Casos de uso e repositórios sem dependências de React  
✅ **Manutenibilidade** - Cada camada tem responsabilidade clara  
✅ **Escalabilidade** - Fácil adicionar novos casos de uso  
✅ **Flexibilidade** - Trocar implementação de repositório sem afetar UI  
✅ **Reutilização** - Lógica de negócio independente da UI  
✅ **Separação de Conceitos** - Framework agnóstico até a camada de apresentação

---

## 📝 Próximos Passos

1. Criar estrutura de pastas
2. Definir entidades (Transaction, User, Investment)
3. Implementar repositórios (interfaces + implementação em memória)
4. Criar casos de uso
5. Refatorar hooks customizados
6. Refatorar Context Providers
7. Atualizar componentes para usar novos hooks
8. Adicionar testes
