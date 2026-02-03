/**
 * User Module - Infrastructure Repository Implementation
 */

import { IUserRepository } from "../../core/repositories/IUserRepository";
import { User } from "../../core/entities/User";

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();
  private currentUserId: string | null = null;

  constructor(initialUsers: User[] = [], currentUserId?: string) {
    initialUsers.forEach((user) => {
      this.users.set(user.id, user);
    });
    this.currentUserId = currentUserId || (initialUsers[0]?.id || null);
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUserId) {
      return null;
    }
    return this.users.get(this.currentUserId) || null;
  }

  async getById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async update(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }
}
