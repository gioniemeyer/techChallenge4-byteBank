/**
 * User Module - Repository Interface
 */

import { User } from "../entities/User";

export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  update(user: User): Promise<User>;
  getById(id: string): Promise<User | null>;
}
