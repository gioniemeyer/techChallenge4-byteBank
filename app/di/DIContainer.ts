/**
 * Injeção de Dependência - Container DI
 * Centraliza a criação de todas as instâncias com suas dependências
 */

import {
  InMemoryTransactionRepository,
  GetTransactionsUseCase,
  AddTransactionUseCase,
  EditTransactionUseCase,
  DeleteTransactionUseCase,
  Transaction,
} from "@/app/modules/transactions";

import {
  InMemoryUserRepository,
  GetCurrentUserUseCase,
  User,
} from "@/app/modules/user";

import {
  InMemoryInvestmentRepository,
  GetInvestmentsUseCase,
  Investment,
} from "@/app/modules/investments";

import {
  FirebaseAuthRepository,
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  GetCurrentUserUseCase as GetCurrentAuthUserUseCase,
} from "@/app/modules/auth";
import { auth } from "@/app/config/firebase";

// Importar dados mock
import { statementMock } from "../mocks/statement-mock";
import { userMock } from "../mocks/user-mock";
import { investmentsMock } from "../mocks/investments-mock";

/**
 * Container centralizado de injeção de dependência
 * Responsável por instanciar todos os casos de uso e repositórios
 */
export class DIContainer {
  private static instance: DIContainer;

  // Repositórios
  private transactionRepository: InMemoryTransactionRepository;
  private userRepository: InMemoryUserRepository;
  private investmentRepository: InMemoryInvestmentRepository;
  private authRepository: FirebaseAuthRepository;

  // Casos de Uso - Transações
  private getTransactionsUseCase: GetTransactionsUseCase;
  private addTransactionUseCase: AddTransactionUseCase;
  private editTransactionUseCase: EditTransactionUseCase;
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  // Casos de Uso - Usuário
  private getCurrentUserUseCase: GetCurrentUserUseCase;

  // Casos de Uso - Investimentos
  private getInvestmentsUseCase: GetInvestmentsUseCase;

  // Casos de Uso - Autenticação
  private signInUseCase: SignInUseCase;
  private signUpUseCase: SignUpUseCase;
  private signOutUseCase: SignOutUseCase;
  private getCurrentAuthUserUseCase: GetCurrentAuthUserUseCase;

  private constructor() {
    // Inicializa repositório com persistência em SessionStorage
    // Se houver dados no cache, usa eles; senão, usa o mock inicial
    this.transactionRepository = new InMemoryTransactionRepository(
      convertMockTransactions(statementMock)
    );

    const userEntity = convertMockUser(userMock[0]);
    this.userRepository = new InMemoryUserRepository(
      [userEntity],
      userEntity.id
    );

    this.investmentRepository = new InMemoryInvestmentRepository(
      convertMockInvestments(investmentsMock)
    );

    // Inicializa casos de uso com injeção de dependência
    this.getTransactionsUseCase = new GetTransactionsUseCase(
      this.transactionRepository
    );
    this.addTransactionUseCase = new AddTransactionUseCase(
      this.transactionRepository
    );
    this.editTransactionUseCase = new EditTransactionUseCase(
      this.transactionRepository
    );
    this.deleteTransactionUseCase = new DeleteTransactionUseCase(
      this.transactionRepository
    );

    this.getCurrentUserUseCase = new GetCurrentUserUseCase(
      this.userRepository
    );

    this.getInvestmentsUseCase = new GetInvestmentsUseCase(
      this.investmentRepository
    );

    // Inicializa repositório e casos de uso de autenticação
    this.authRepository = new FirebaseAuthRepository(auth);
    this.signInUseCase = new SignInUseCase(this.authRepository);
    this.signUpUseCase = new SignUpUseCase(this.authRepository);
    this.signOutUseCase = new SignOutUseCase(this.authRepository);
    this.getCurrentAuthUserUseCase = new GetCurrentAuthUserUseCase(
      this.authRepository
    );
  }

  /**
   * Singleton - retorna a única instância
   */
  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Getters para Casos de Uso

  public getGetTransactionsUseCase(): GetTransactionsUseCase {
    return this.getTransactionsUseCase;
  }

  public getAddTransactionUseCase(): AddTransactionUseCase {
    return this.addTransactionUseCase;
  }

  public getEditTransactionUseCase(): EditTransactionUseCase {
    return this.editTransactionUseCase;
  }

  public getDeleteTransactionUseCase(): DeleteTransactionUseCase {
    return this.deleteTransactionUseCase;
  }

  public getGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return this.getCurrentUserUseCase;
  }

  public getGetInvestmentsUseCase(): GetInvestmentsUseCase {
    return this.getInvestmentsUseCase;
  }

  public getSignInUseCase(): SignInUseCase {
    return this.signInUseCase;
  }

  public getSignUpUseCase(): SignUpUseCase {
    return this.signUpUseCase;
  }

  public getSignOutUseCase(): SignOutUseCase {
    return this.signOutUseCase;
  }

  public getGetCurrentAuthUserUseCase(): GetCurrentAuthUserUseCase {
    return this.getCurrentAuthUserUseCase;
  }

  /**
   * Método genérico resolve para manter compatibilidade
   */
  public resolve<T>(serviceName: string): T {
    switch (serviceName) {
      case "SignInUseCase":
        return this.signInUseCase as T;
      case "SignUpUseCase":
        return this.signUpUseCase as T;
      case "SignOutUseCase":
        return this.signOutUseCase as T;
      case "GetCurrentUserUseCase":
        return this.getCurrentAuthUserUseCase as T;
      case "GetTransactionsUseCase":
        return this.getTransactionsUseCase as T;
      case "AddTransactionUseCase":
        return this.addTransactionUseCase as T;
      case "EditTransactionUseCase":
        return this.editTransactionUseCase as T;
      case "DeleteTransactionUseCase":
        return this.deleteTransactionUseCase as T;
      case "GetCurrentUserUseCase":
        return this.getCurrentUserUseCase as T;
      case "GetInvestmentsUseCase":
        return this.getInvestmentsUseCase as T;
      default:
        throw new Error(`Serviço não encontrado: ${serviceName}`);
    }
  }

  /**
   * Limpa o cache de transações e restaura o mock inicial
   * (requer reload da página para aplicar)
   */
  public clearTransactionCache(): void {
    this.transactionRepository.clearCache();
  }
}

/**
 * Funções auxiliares para converter dados mock em entidades
 */
function convertMockTransactions(
  mockData: Array<{ id: number; date: string; type: string; value: number }>
): Transaction[] {
  return mockData.map(
    (item) =>
      new Transaction(
        item.id,
        item.date,
        item.type as "Depósito" | "Transferência",
        item.value
      )
  );
}

function convertMockUser(mockData: {
  id: number;
  first_name: string;
  last_name: string;
}): User {
  return new User(
    mockData.id.toString(),
    `${mockData.first_name} ${mockData.last_name}`,
    2700,
    "12345-6"
  );
}

function convertMockInvestments(
  mockData: Array<{
    id: number;
    total?: number;
    fixo?: number;
    variavel?: number;
  }>
): Investment[] {
  return mockData.map(
    (item) =>
      new Investment(
        item.id,
        `Investimento ${item.id}`,
        "Investimento de aplicações",
        item.total || 0,
        item.fixo || 0,
        "Equity"
      )
  );
}
