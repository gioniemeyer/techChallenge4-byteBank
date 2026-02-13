import { User, AuthCredentials, SignUpData, AuthResponse } from '../entities/User';

/**
 * Interface IAuthRepository - Contrato que define as operações de autenticação
 * Segue o padrão Repository e inversão de dependência (Dependency Inversion)
 */

export interface IAuthRepository {
  /**
   * Registra um novo usuário
   * @param data Dados de cadastro (email, password, displayName)
   * @returns Resposta com usuário e token JWT
   */
  signUp(data: SignUpData): Promise<AuthResponse>;

  /**
   * Faz login de um usuário existente
   * @param credentials Credenciais (email, password)
   * @returns Resposta com usuário e token JWT
   */
  signIn(credentials: AuthCredentials): Promise<AuthResponse>;

  /**
   * Faz logout do usuário
   */
  signOut(): Promise<void>;

  /**
   * Obtém o usuário atualmente autenticado
   * @returns Usuário autenticado ou null
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Obtém o token JWT do usuário atualmente autenticado
   * @returns Token JWT ou null
   */
  getToken(): Promise<string | null>;

  /**
   * Verifica se há um usuário autenticado
   * @returns true se autenticado, false caso contrário
   */
  isAuthenticated(): Promise<boolean>;

  /**
   * Envia email de redefinição de senha
   * @param email Email do usuário
   */
  resetPassword(email: string): Promise<void>;
}
