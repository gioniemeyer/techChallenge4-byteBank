// Core - Entities
export { type User, type AuthCredentials, type SignUpData, type AuthResponse } from './core/entities/User';

// Core - Repositories
export type { IAuthRepository } from './core/repositories/IAuthRepository';

// Core - UseCases
export { SignUpUseCase } from './core/usecases/SignUpUseCase';
export { SignInUseCase } from './core/usecases/SignInUseCase';
export { SignOutUseCase } from './core/usecases/SignOutUseCase';
export { GetCurrentUserUseCase } from './core/usecases/GetCurrentUserUseCase';

// Infrastructure
export { FirebaseAuthRepository } from './infrastructure/repositories/FirebaseAuthRepository';
