"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { Box } from "@mui/material";
import CentralBox from "../central-components/CentralBox";
import Statement from "../statement-components/Statement";

/** Componente que exibe o corpo principal da aplicação. */
export default function ContentBody() {
  const { isMobile } = useResponsive();
  const { selectedItem } = useSidebar();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: isMobile ? "0px" : "10px",
      }}
    >
      <CentralBox content="welcome" />

      <CentralBox content={
        selectedItem === "Início" || selectedItem === "Transferências"
          ? "transaction"
          : "investments"
      } />
      {isMobile && <Statement />}
    </Box>
  );
}
