'use client';

import MainContent from "./components/main-content/MainContent";
import { ProtectedRoute } from "./modules/auth/presentation/components/ProtectedRoute";
import { AuthPage } from "./modules/auth/presentation/components/AuthPage";

export default function Home() {
  return (
    <ProtectedRoute fallback={<AuthPage initialView="login" />}>
      <MainContent />
    </ProtectedRoute>
  );
}
