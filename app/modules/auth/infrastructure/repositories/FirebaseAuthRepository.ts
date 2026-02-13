import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  Auth,
  User as FirebaseUser,
} from 'firebase/auth';
import { IAuthRepository } from '../../core/repositories/IAuthRepository';
import { User, AuthCredentials, SignUpData, AuthResponse } from '../../core/entities/User';

/**
 * FirebaseAuthRepository - Implementação do repositório usando Firebase
 * Responsável por comunicar com o serviço de autenticação do Firebase
 */

export class FirebaseAuthRepository implements IAuthRepository {
  constructor(private auth: Auth) {}

  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // Obter token JWT
      const token = await user.getIdToken();

      return {
        user: this.mapFirebaseUserToUser(user),
        token,
      };
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  async signIn(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      const user = userCredential.user;

      // Obter token JWT
      const token = await user.getIdToken();

      return {
        user: this.mapFirebaseUserToUser(user),
        token,
      };
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(this.auth);
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        async (firebaseUser) => {
          unsubscribe();

          if (firebaseUser) {
            try {
              resolve(this.mapFirebaseUserToUser(firebaseUser));
            } catch (error) {
              reject(this.handleFirebaseError(error));
            }
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  }

  async getToken(): Promise<string | null> {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  async resetPassword(email: string): Promise<void> {
    try {
      // Implementar quando necessário
      // Para usar: importar sendPasswordResetEmail do firebase/auth
      console.warn(`Reset de senha para ${email} ainda não implementado`);
      throw new Error('Reset de senha ainda não implementado');
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  /**
   * Mapeia usuário do Firebase para a entidade User do domínio
   */
  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(firebaseUser.metadata?.creationTime || new Date()),
      updatedAt: new Date(firebaseUser.metadata?.lastSignInTime || new Date()),
    };
  }

  /**
   * Trata e traduz erros do Firebase
   */
  private handleFirebaseError(error: unknown): Error {
    if (!(error instanceof Error)) {
      return new Error('Erro desconhecido');
    }

    const errorObj = error as Error & { code?: string };
    const errorCode = errorObj.code || '';
    const errorMessage = error.message || 'Erro desconhecido';

    const errorMap: { [key: string]: string } = {
      'auth/invalid-credential': 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.',
      'auth/user-not-found': 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.',
      'auth/wrong-password': 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/invalid-email': 'Email inválido',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde.',
    };

    return new Error(errorMap[errorCode] || errorMessage);
  }
}
