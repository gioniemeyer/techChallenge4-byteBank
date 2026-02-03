/**
 * Transactions Module - Delete Transaction Use Case
 */

import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { NotFoundError } from "@/app/modules/shared";

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: number): Promise<void> {
    const transaction = await this.transactionRepository.getById(id);

    if (!transaction) {
      throw new NotFoundError("Transaction", id);
    }

    await this.transactionRepository.delete(id);
  }
}
