import { IAuthRepository } from '../repositories/IAuthRepository';

/**
 * SignOutUseCase - Caso de uso para logout
 */

export class SignOutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.signOut();
  }
}
