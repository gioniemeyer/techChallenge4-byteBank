"use client";
import { ResponsiveProvider } from "@/app/contexts/ResponsiveContext";
import { TransactionProvider } from "@/app/contexts/TransactionContext";
import { SidebarProvider } from "@/app/contexts/SidebarContext";
import BodyContainer from "../BodyContainer";
import Header from "../header-components/Header";

/** Componente que exibe o conteúdo principal da aplicação. */
export default function MainContent() {
  return (
    <ResponsiveProvider>
      <TransactionProvider>
        <SidebarProvider>
          <Header />
          <BodyContainer />
        </SidebarProvider>
      </TransactionProvider>
    </ResponsiveProvider>
  );
}
