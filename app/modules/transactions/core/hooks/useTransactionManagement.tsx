/**
 * Transactions Module - Hook
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { Transaction } from "../../core/entities/Transaction";
import { DIContainer } from "@/app/di/DIContainer";
import { ValidationError, NotFoundError } from "@/app/modules/shared";

interface UseTransactionManagementReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  addTransaction: (
    date: string,
    type: "Depósito" | "Transferência",
    value: number,
  ) => Promise<void>;
  editTransaction: (
    id: number,
    date: string,
    type: "Depósito" | "Transferência",
    value: number,
  ) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export function useTransactionManagement(): UseTransactionManagementReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const diContainer = DIContainer.getInstance();

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const useCase = diContainer.getGetTransactionsUseCase();
      const data = await useCase.execute();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar transações",
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
        // Recarregar transações após adicionar
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
    [diContainer, loadTransactions],
  );

  const editTransaction = useCallback(
    async (
      id: number,
      date: string,
      type: "Depósito" | "Transferência",
      value: number,
    ) => {
      try {
        setError(null);
        const useCase = diContainer.getEditTransactionUseCase();
        await useCase.execute({ id, date, type, value });
        // Recarregar transações após editar
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
    [diContainer, loadTransactions],
  );

  const deleteTransaction = useCallback(
    async (id: number) => {
      try {
        setError(null);
        const useCase = diContainer.getDeleteTransactionUseCase();
        await useCase.execute(id);
        // Recarregar transações após deletar
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
    [diContainer, loadTransactions],
  );

  return {
    transactions,
    loading,
    error,
    editingId,
    setEditingId,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };
}
