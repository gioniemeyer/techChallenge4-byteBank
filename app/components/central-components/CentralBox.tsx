"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { Box } from "@mui/material";
import Investments from "../investments/Investments";
import Transaction from "./Transaction"; // este Transaction espera props { open, onClose }
import Welcome from "./Welcome";
import { useState, useCallback } from "react";

interface CentralBoxProps {
  content: string;
}

export default function CentralBox({ content }: CentralBoxProps) {
  const { isTablet, isDesktop } = useResponsive();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

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
         <Box sx={{ p: 2 }}>
      <button
        onClick={handleOpen}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "var(--primaryColor)",
          color: "var(--primaryTextColor)",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Nova transação
      </button>
    </Box>
          <Transaction open={open} onClose={handleClose} />
        </>
      )}
      {content === "investments" && <Investments />}
    </Box>
  );
}