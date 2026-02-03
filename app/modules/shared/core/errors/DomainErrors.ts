/**
 * Shared Module - Core Errors
 * Erros compartilhados entre todos os módulos
 */

/**
 * Erro base de domínio
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

/**
 * Erro de validação
 */
export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Erro quando recurso não é encontrado
 */
export class NotFoundError extends DomainError {
  constructor(resource: string, id: string | number) {
    super(`${resource} com ID ${id} não encontrado`);
    this.name = "NotFoundError";
  }
}
