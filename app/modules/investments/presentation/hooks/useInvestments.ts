/**
 * Investments Module - Hook
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { Investment } from "../../core/entities/Investment";
import { DIContainer } from "@/app/di/DIContainer";

interface UseInvestmentsReturn {
  investments: Investment[];
  loading: boolean;
  error: string | null;
}

export function useInvestments(): UseInvestmentsReturn {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const diContainer = DIContainer.getInstance();

  const loadInvestments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const useCase = diContainer.getGetInvestmentsUseCase();
      const data = await useCase.execute();
      setInvestments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar investimentos");
    } finally {
      setLoading(false);
    }
  }, [diContainer]);

  useEffect(() => {
    loadInvestments();
  }, [loadInvestments]);

  return { investments, loading, error };
}
