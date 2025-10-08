"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState("Início");

  return (
    <SidebarContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
