import { IAuthRepository } from '../repositories/IAuthRepository';
import { AuthCredentials, AuthResponse } from '../entities/User';

/**
 * SignInUseCase - Caso de uso para login
 * Encapsula a lógica de negócio de forma isolada e testável
 */

export class SignInUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<AuthResponse> {
    // Validações de negócio
    if (!credentials.email || !credentials.password) {
      throw new Error('Email e password são obrigatórios');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Email inválido');
    }

    // Delegação ao repositório
    return this.authRepository.signIn(credentials);
  }
}
