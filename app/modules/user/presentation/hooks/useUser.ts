/**
 * User Module - Hook
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "../../core/entities/User";
import { DIContainer } from "@/app/di/DIContainer";

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const diContainer = DIContainer.getInstance();

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const useCase = diContainer.getGetCurrentUserUseCase();
      const userData = await useCase.execute();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar usuário");
    } finally {
      setLoading(false);
    }
  }, [diContainer]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return { user, loading, error };
}
