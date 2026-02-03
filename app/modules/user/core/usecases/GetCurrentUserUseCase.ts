/**
 * User Module - Get Current User Use Case
 */

import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User | null> {
    return this.userRepository.getCurrentUser();
  }
}
