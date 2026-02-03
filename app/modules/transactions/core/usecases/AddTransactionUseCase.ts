/**
 * Transactions Module - Add Transaction Use Case
 */

import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { Transaction } from "../entities/Transaction";
import { ValidationError } from "@/app/modules/shared";

export interface AddTransactionInput {
  date: string;
  type: "Depósito" | "Transferência";
  value: number;
}

export class AddTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: AddTransactionInput): Promise<Transaction> {
    if (input.value <= 0) {
      throw new ValidationError("O valor da transação deve ser maior que 0");
    }

    if (!input.date) {
      throw new ValidationError("A data da transação é obrigatória");
    }

    if (!input.type || !["Depósito", "Transferência"].includes(input.type)) {
      throw new ValidationError(
        "O tipo de transação deve ser 'Depósito' ou 'Transferência'"
      );
    }

    const transaction = new Transaction(
      0,
      input.date,
      input.type,
      input.value
    );

    return this.transactionRepository.add(transaction);
  }
}
