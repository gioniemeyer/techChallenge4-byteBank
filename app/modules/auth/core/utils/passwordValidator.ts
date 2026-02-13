/**
 * Validador de Senha Forte
 * Regras:
 * - Mínimo 8 caracteres
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 letra minúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Verifica se tem pelo menos 8 caracteres
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }

  // Verifica se tem pelo menos 1 letra maiúscula
  if (!/[A-Z]/.test(password)) {
    errors.push('Pelo menos 1 letra maiúscula');
  }

  // Verifica se tem pelo menos 1 letra minúscula
  if (!/[a-z]/.test(password)) {
    errors.push('Pelo menos 1 letra minúscula');
  }

  // Verifica se tem pelo menos 1 número
  if (!/[0-9]/.test(password)) {
    errors.push('Pelo menos 1 número');
  }

  // Verifica se tem pelo menos 1 caractere especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Pelo menos 1 caractere especial (!@#$%^&* etc)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Retorna uma mensagem de dica sobre requisitos de senha
 */
export function getPasswordRequirements(): string {
  return 'A senha deve conter: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial';
}
