/**
 * Transactions Module - Entity
 * Entidade de Transação dentro do módulo
 */

export interface ITransaction {
  id: number;
  date: string;
  type: "Depósito" | "Transferência";
  value: number;
}

export class Transaction implements ITransaction {
  id: number;
  date: string;
  type: "Depósito" | "Transferência";
  value: number;

  constructor(
    id: number,
    date: string,
    type: "Depósito" | "Transferência",
    value: number
  ) {
    if (value < 0) {
      throw new Error("Transaction value cannot be negative");
    }
    if (!date) {
      throw new Error("Transaction date is required");
    }
    if (!type) {
      throw new Error("Transaction type is required");
    }

    this.id = id;
    this.date = date;
    this.type = type;
    this.value = value;
  }

  getFormattedValue(): string {
    return this.value.toFixed(2).replace(".", ",");
  }

  isDeposit(): boolean {
    return this.type === "Depósito";
  }

  isTransfer(): boolean {
    return this.type === "Transferência";
  }
}
