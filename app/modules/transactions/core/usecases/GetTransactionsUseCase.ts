/**
 * Transactions Module - Get Transactions Use Case
 */

import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { Transaction } from "../entities/Transaction";

export class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepository.getAll();
  }
}
