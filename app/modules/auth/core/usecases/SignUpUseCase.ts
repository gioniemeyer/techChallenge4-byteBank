import { IAuthRepository } from '../repositories/IAuthRepository';
import { SignUpData, AuthResponse } from '../entities/User';
import { validatePassword } from '../utils/passwordValidator';

/**
 * SignUpUseCase - Caso de uso para cadastro de novo usuário
 * Encapsula a lógica de negócio de forma isolada e testável
 */

export class SignUpUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: SignUpData): Promise<AuthResponse> {
    // Validações de negócio
    if (!data.email || !data.password || !data.displayName) {
      throw new Error('Email, password e displayName são obrigatórios');
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email inválido');
    }

    // Validação de senha forte
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      throw new Error(
        `Senha fraca. Requisitos não atendidos: ${passwordValidation.errors.join(', ')}`
      );
    }

    // Delegação ao repositório
    return this.authRepository.signUp(data);
  }
}
