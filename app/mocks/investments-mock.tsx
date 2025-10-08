export interface InvestmentsInterface {
  id: number;
  total: number;
  fixo: number;
  variavel: number;
}

export const investmentsMock: InvestmentsInterface[] = [
  {
    id: 1,
    total: 50000,
    fixo: 36000,
    variavel: 14000,
  }
];
