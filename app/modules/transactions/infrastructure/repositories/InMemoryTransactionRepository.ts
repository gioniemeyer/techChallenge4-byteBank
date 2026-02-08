/**
 * Transactions Module - Infrastructure Repository Implementation
 */

import {
  ITransactionRepository,
  TransactionInput,
} from "../../core/repositories/ITransactionRepository";
import { Transaction } from "../../core/entities/Transaction";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];
  private nextId: number = 1;

  constructor(initialTransactions: Transaction[] = []) {
    this.transactions = initialTransactions;
    if (initialTransactions.length > 0) {
      this.nextId = Math.max(...initialTransactions.map((t) => t.id ?? 0)) + 1;
    }
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }

  async getById(id: number): Promise<Transaction | null> {
    return this.transactions.find((t) => t.id === id) || null;
  }

  async add(transaction: TransactionInput): Promise<Transaction> {
    const newTransaction = new Transaction(
      this.nextId++,
      transaction.date,
      transaction.type,
      transaction.value,
    );

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async update(
    id: number,
    transaction: TransactionInput,
  ): Promise<Transaction> {
    const index = this.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    const updated = new Transaction(
      id,
      transaction.date,
      transaction.type,
      transaction.value,
    );

    this.transactions[index] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }
}
