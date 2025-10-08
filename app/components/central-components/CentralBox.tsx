"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { Box } from "@mui/material";
import Investments from "../investments/Investments";
import Transaction from "./Transaction";
import Welcome from "./Welcome";

interface CentralBoxProps {
  content: string;
}

/** Componente que exibe o conteúdo central da aplicação. */
export default function CentralBox({ content }: CentralBoxProps) {
  const { isTablet, isDesktop } = useResponsive();

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
      {content === "transaction" && <Transaction />}
      {content === "investments" && <Investments />}
    </Box>
  );
}
