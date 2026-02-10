/**
 * Transactions Module - Infrastructure Repository Implementation
 *
 * Repositório em memória com persistência em SessionStorage.
 * Mantém as alterações entre reloads da página.
 */

import {
  ITransactionRepository,
  TransactionInput,
} from "../../core/repositories/ITransactionRepository";
import { Transaction } from "../../core/entities/Transaction";

const STORAGE_KEY = "bytebank_transactions";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];
  private nextId: number = 1;

  constructor(initialTransactions: Transaction[] = []) {
    // Tenta carregar do sessionStorage primeiro
    const stored = this.loadFromStorage();

    if (stored && stored.length > 0) {
      // Usa dados persistidos
      this.transactions = stored;
      this.nextId = Math.max(...stored.map((t) => t.id ?? 0)) + 1;
    } else {
      // Usa mock inicial e salva no storage
      this.transactions = initialTransactions;
      if (initialTransactions.length > 0) {
        this.nextId =
          Math.max(...initialTransactions.map((t) => t.id ?? 0)) + 1;
      }
      this.saveToStorage();
    }
  }

  private loadFromStorage(): Transaction[] | null {
    if (typeof window === "undefined") return null;

    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data) as Transaction[];
      return parsed.map(
        (t) => new Transaction(t.id!, t.date, t.type, t.value)
      );
    } catch {
      return null;
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.transactions));
    } catch { }
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
      transaction.value
    );

    this.transactions.push(newTransaction);
    this.saveToStorage();
    return newTransaction;
  }

  async update(id: number, transaction: TransactionInput): Promise<Transaction> {
    const index = this.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    const updated = new Transaction(
      id,
      transaction.date,
      transaction.type,
      transaction.value
    );

    this.transactions[index] = updated;
    this.saveToStorage();
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.saveToStorage();
  }

  /**
   * Limpa o cache e restaura o mock inicial no próximo reload
   */
  clearCache(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
