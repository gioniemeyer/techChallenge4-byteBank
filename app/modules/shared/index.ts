/**
 * Índice do Módulo Compartilhado - Shared Module
 * 
 * Código reutilizável compartilhado entre outros módulos.
 * Use este módulo para erros comuns, utilidades, tipos globais.
 * 
 * Exemplo:
 * import { DomainError, ValidationError } from "@/app/modules/shared";
 */

// ============= CORE ERRORS =============
export { DomainError, ValidationError, NotFoundError } from "./core/errors/DomainErrors";

// ============= INFRASTRUCTURE =============
// Pode ser usado para serviços compartilhados (logger, API client, etc)

// ============= PRESENTATION =============
// Pode ser usado para componentes/hooks compartilhados
