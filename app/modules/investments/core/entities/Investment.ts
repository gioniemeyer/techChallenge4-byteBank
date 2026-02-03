/**
 * Investments Module - Entity
 */

export interface IInvestment {
  id: number;
  name: string;
  description: string;
  value: number;
  profitability: number;
  equity: string;
}

export class Investment implements IInvestment {
  id: number;
  name: string;
  description: string;
  value: number;
  profitability: number;
  equity: string;

  constructor(
    id: number,
    name: string,
    description: string,
    value: number,
    profitability: number,
    equity: string
  ) {
    if (!name) {
      throw new Error("Investment name is required");
    }
    if (value < 0) {
      throw new Error("Investment value cannot be negative");
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.profitability = profitability;
    this.equity = equity;
  }

  getFormattedValue(): string {
    return this.value.toFixed(2).replace(".", ",");
  }

  getFormattedProfitability(): string {
    return `${this.profitability}%`;
  }
}
