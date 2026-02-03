/**
 * Investments Module - Infrastructure Repository Implementation
 */

import { IInvestmentRepository } from "../../core/repositories/IInvestmentRepository";
import { Investment } from "../../core/entities/Investment";

export class InMemoryInvestmentRepository implements IInvestmentRepository {
  private investments: Investment[] = [];
  private nextId: number = 1;

  constructor(initialInvestments: Investment[] = []) {
    this.investments = initialInvestments;
    if (initialInvestments.length > 0) {
      this.nextId = Math.max(...initialInvestments.map((i) => i.id ?? 0)) + 1;
    }
  }

  async getAll(): Promise<Investment[]> {
    return [...this.investments];
  }

  async getById(id: number): Promise<Investment | null> {
    return this.investments.find((i) => i.id === id) || null;
  }

  async create(investment: Omit<Investment, "id">): Promise<Investment> {
    const newInvestment = new Investment(
      this.nextId++,
      investment.name,
      investment.description,
      investment.value,
      investment.profitability,
      investment.equity
    );

    this.investments.push(newInvestment);
    return newInvestment;
  }

  async update(
    id: number,
    investment: Omit<Investment, "id">
  ): Promise<Investment> {
    const index = this.investments.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new Error(`Investment with ID ${id} not found`);
    }

    const updated = new Investment(
      id,
      investment.name,
      investment.description,
      investment.value,
      investment.profitability,
      investment.equity
    );

    this.investments[index] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.investments = this.investments.filter((i) => i.id !== id);
  }
}
