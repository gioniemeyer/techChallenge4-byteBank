"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { AppBar, Box, Container } from "@mui/material";
import DrawerButton from "../buttons/DrawerButton";
import { UserMenu } from "./UserMenu";

/** Componente que exibe o cabeçalho da aplicação. */
export default function Header() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const containerWidth = isDesktop ? "1200px" : isTablet ? "600px" : "312px";
  const justifyContentValue = isMobile ? "space-between" : "right";

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        background: "var(--primaryColor)",
        color: "var(--primaryTextColor)",
        height: "96px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        fixed
        sx={{
          width: containerWidth,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: justifyContentValue,
          }}
        >
          {isMobile && <DrawerButton />}
          <UserMenu />
        </Box>
      </Container>
    </AppBar>
  );
}
