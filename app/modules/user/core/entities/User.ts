/**
 * User Module - Entity
 */

export interface IUser {
  id: string;
  name: string;
  salary: number;
  accountNumber: string;
}

export class User implements IUser {
  id: string;
  name: string;
  salary: number;
  accountNumber: string;

  constructor(
    id: string,
    name: string,
    salary: number,
    accountNumber: string
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error("User name is required");
    }
    if (salary < 0) {
      throw new Error("User salary cannot be negative");
    }
    if (!accountNumber) {
      throw new Error("Account number is required");
    }

    this.id = id;
    this.name = name;
    this.salary = salary;
    this.accountNumber = accountNumber;
  }

  getFormattedSalary(): string {
    return this.salary.toFixed(2).replace(".", ",");
  }
}
