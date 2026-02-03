/**
 * Investments Module - Repository Interface
 */

import { Investment } from "../entities/Investment";

export interface IInvestmentRepository {
  getAll(): Promise<Investment[]>;
  getById(id: number): Promise<Investment | null>;
  create(investment: Omit<Investment, "id">): Promise<Investment>;
  update(id: number, investment: Omit<Investment, "id">): Promise<Investment>;
  delete(id: number): Promise<void>;
}
