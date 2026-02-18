import { IAuthRepository } from '../repositories/IAuthRepository';
import { User } from '../entities/User';

/**
 * GetCurrentUserUseCase - Caso de uso para obter usuário autenticado
 */

export class GetCurrentUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
