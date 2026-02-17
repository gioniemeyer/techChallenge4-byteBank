"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { Box } from "@mui/material";
import Investments from "../investments/Investments";
import Welcome from "./Welcome";
import { useState, useCallback } from "react";
import TransactionCreateForm from "./TransactionCreateForm";
import TransactionEditModal from "./TransactionEditModal";

interface CentralBoxProps {
  content: string;
}

export default function CentralBox({ content }: CentralBoxProps) {
  const { isTablet, isDesktop } = useResponsive();
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = useCallback(() => setEditOpen(true), []);
  const handleEditClose = useCallback(() => setEditOpen(false), []);

  return (
    <Box
      sx={{
        width: isDesktop ? "690px" : isTablet ? "600px" : "312px",
        position: "relative",
        top: isDesktop ? "24px" : "48px",
        mb: 3,
        borderRadius: "8px",
        backgroundColor:
          content === "welcome"
            ? "var(--primaryColor)"
            : "var(--backgroundBox)",
      }}
    >
      {content === "welcome" && <Welcome />}

      {content === "transaction" && (
        <>
          {/* Formulário inline para criar nova transação */}
          <TransactionCreateForm />
          {/* Modal de edição: abrir via ação externa (ex.: clicar item na lista) */}
          <TransactionEditModal open={editOpen} onClose={handleEditClose} />
        </>
      )}

      {content === "investments" && <Investments />}
    </Box>
  );
}
