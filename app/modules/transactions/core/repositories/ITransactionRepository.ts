/**
 * Transactions Module - Repository Interface
 */

import { Transaction } from "../entities/Transaction";

export interface TransactionInput {
  date: string;
  type: "Depósito" | "Transferência";
  value: number;
}

export interface ITransactionRepository {
  getAll(): Promise<Transaction[]>;
  getById(id: number): Promise<Transaction | null>;
  add(transaction: TransactionInput): Promise<Transaction>;
  update(id: number, transaction: TransactionInput): Promise<Transaction>;
  delete(id: number): Promise<void>;
}
