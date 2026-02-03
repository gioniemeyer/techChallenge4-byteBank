/**
 * Investments Module - Get Investments Use Case
 */

import { IInvestmentRepository } from "../repositories/IInvestmentRepository";
import { Investment } from "../entities/Investment";

export class GetInvestmentsUseCase {
  constructor(private investmentRepository: IInvestmentRepository) {}

  async execute(): Promise<Investment[]> {
    return this.investmentRepository.getAll();
  }
}
