/**
 * Transactions Module - Edit Transaction Use Case
 */

import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { Transaction } from "../entities/Transaction";
import { ValidationError, NotFoundError } from "@/app/modules/shared";

export interface EditTransactionInput {
  id: number;
  date: string;
  type: "Depósito" | "Transferência";
  value: number;
}

export class EditTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: EditTransactionInput): Promise<Transaction> {
    const existingTransaction = await this.transactionRepository.getById(input.id);

    if (!existingTransaction) {
      throw new NotFoundError("Transaction", input.id);
    }

    if (input.value <= 0) {
      throw new ValidationError("O valor da transação deve ser maior que 0");
    }

    if (!input.date) {
      throw new ValidationError("A data da transação é obrigatória");
    }

    const updatedData = {
      date: input.date,
      type: input.type,
      value: input.value,
    };

    return this.transactionRepository.update(input.id, updatedData);
  }
}
