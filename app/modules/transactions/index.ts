/**
 * Índice do Módulo de Transações - Transactions Module
 * 
 * Este arquivo exporta a interface pública do módulo.
 * Outros módulos devem importar APENAS deste arquivo.
 * 
 * Exemplo:
 * import { 
 *   GetTransactionsUseCase, 
 *   AddTransactionUseCase,
 *   useTransactionManagement 
 * } from "@/app/modules/transactions";
 */

// ============= CORE =============

// Entities
export { Transaction, type ITransaction } from "./core/entities/Transaction";

// Repositories
export type { ITransactionRepository } from "./core/repositories/ITransactionRepository";

// Use Cases
export { GetTransactionsUseCase } from "./core/usecases/GetTransactionsUseCase";
export { AddTransactionUseCase } from "./core/usecases/AddTransactionUseCase";
export { EditTransactionUseCase } from "./core/usecases/EditTransactionUseCase";
export { DeleteTransactionUseCase } from "./core/usecases/DeleteTransactionUseCase";

// Errors - importar do módulo shared
export { ValidationError, NotFoundError, DomainError } from "@/app/modules/shared";

// ============= INFRASTRUCTURE =============

// Repositories Implementation
export { InMemoryTransactionRepository } from "./infrastructure/repositories/InMemoryTransactionRepository";

// ============= PRESENTATION =============

// Hooks
export { useTransactionManagement } from "./presentation/hooks/useTransactionManagement";

// ============= PRIVATE (Não exporte!) =============
// DIContainer é privado e gerenciado internamente
// Componentes devem usar hooks, não o container diretamente
