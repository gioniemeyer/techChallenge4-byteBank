"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Transaction } from "@/app/modules/transactions/core/entities/Transaction";
import { DIContainer } from "@/app/di/DIContainer";
import { ValidationError, NotFoundError } from "@/app/modules/shared";

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  editingId: number | null;
  balance: number;
  setEditingId: (id: number | null) => void;
  addTransaction: (
    date: string,
    type: "Depósito" | "Transferência",
    value: number
  ) => Promise<void>;
  editTransaction: (
    id: number,
    date: string,
    type: "Depósito" | "Transferência",
    value: number
  ) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const diContainer = DIContainer.getInstance();

  // Calcula o saldo baseado nas transações
  const balance = transactions.reduce((acc, t) => {
    return t.type === "Depósito" ? acc + t.value : acc - t.value;
  }, 0);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const useCase = diContainer.getGetTransactionsUseCase();
      const data = await useCase.execute();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar transações"
      );
    } finally {
      setLoading(false);
    }
  }, [diContainer]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = useCallback(
    async (date: string, type: "Depósito" | "Transferência", value: number) => {
      try {
        setError(null);
        const useCase = diContainer.getAddTransactionUseCase();
        await useCase.execute({ date, type, value });
        await loadTransactions();
      } catch (err) {
        const errorMessage =
          err instanceof ValidationError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Erro ao adicionar transação";
        setError(errorMessage);
        throw err;
      }
    },
    [diContainer, loadTransactions]
  );

  const editTransaction = useCallback(
    async (
      id: number,
      date: string,
      type: "Depósito" | "Transferência",
      value: number
    ) => {
      try {
        setError(null);
        const useCase = diContainer.getEditTransactionUseCase();
        await useCase.execute({ id, date, type, value });
        await loadTransactions();
      } catch (err) {
        const errorMessage =
          err instanceof NotFoundError
            ? err.message
            : err instanceof ValidationError
              ? err.message
              : err instanceof Error
                ? err.message
                : "Erro ao editar transação";
        setError(errorMessage);
        throw err;
      }
    },
    [diContainer, loadTransactions]
  );

  const deleteTransaction = useCallback(
    async (id: number) => {
      try {
        setError(null);
        const useCase = diContainer.getDeleteTransactionUseCase();
        await useCase.execute(id);
        await loadTransactions();
      } catch (err) {
        const errorMessage =
          err instanceof NotFoundError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Erro ao deletar transação";
        setError(errorMessage);
        throw err;
      }
    },
    [diContainer, loadTransactions]
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        editingId,
        balance,
        setEditingId,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within TransactionProvider"
    );
  }
  return context;
}
