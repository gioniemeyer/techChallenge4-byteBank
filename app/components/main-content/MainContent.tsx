"use client";
import { ResponsiveProvider } from "@/app/contexts/ResponsiveContext";
import { SidebarProvider } from "@/app/contexts/SidebarContext";
import BodyContainer from "../BodyContainer";
import Header from "../header-components/Header";

/** Componente que exibe o conteúdo principal da aplicação. */
export default function MainContent() {
  return (
    <ResponsiveProvider>
      <SidebarProvider>
        <Header />
        <BodyContainer />
      </SidebarProvider>
    </ResponsiveProvider>
  );
}
