/**
 * Índice do Módulo de Usuário - User Module
 * 
 * Interface pública do módulo de usuário.
 * 
 * Exemplo:
 * import { GetCurrentUserUseCase, useUser } from "@/app/modules/user";
 */

// ============= CORE =============

// Entities
export { User, type IUser } from "./core/entities/User";

// Repositories
export type { IUserRepository } from "./core/repositories/IUserRepository";

// Use Cases
export { GetCurrentUserUseCase } from "./core/usecases/GetCurrentUserUseCase";

// ============= INFRASTRUCTURE =============

// Repositories Implementation
export { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";

// ============= PRESENTATION =============

// Hooks
export { useUser } from "./presentation/hooks/useUser";
