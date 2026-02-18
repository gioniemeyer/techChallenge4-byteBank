/**
 * Entidade User - Modelo de domínio puro
 * Independente de qualquer framework ou biblioteca externa
 */

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  displayName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
