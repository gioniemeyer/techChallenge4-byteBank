/**
 * Índice do Módulo de Investimentos - Investments Module
 * 
 * Interface pública do módulo de investimentos.
 * 
 * Exemplo:
 * import { Investment, useInvestments } from "@/app/modules/investments";
 */

// ============= CORE =============

// Entities
export { Investment, type IInvestment } from "./core/entities/Investment";

// Repositories
export type { IInvestmentRepository } from "./core/repositories/IInvestmentRepository";

// Use Cases
export { GetInvestmentsUseCase } from "./core/usecases/GetInvestmentsUseCase";

// ============= INFRASTRUCTURE =============

// Repositories Implementation
export { InMemoryInvestmentRepository } from "./infrastructure/repositories/InMemoryInvestmentRepository";

// ============= PRESENTATION =============

// Hooks
export { useInvestments } from "./presentation/hooks/useInvestments";
