"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { useUser } from "@/app/modules/user";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, Typography } from "@mui/material";

/** Componente que exibe as informações do usuário. */
export default function UserComponent() {
  const { isMobile } = useResponsive();
  const { user, loading } = useUser();

  if (loading || !user) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: "200px" }}>
        <AccountCircleOutlinedIcon
          sx={{
            color: "var(--secondaryColor)",
            height: "40px",
            width: "40px",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: "200px",
      }}
    >
      {!isMobile && (
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "16px",
            fontWeight: 600,
            padding: "0 10px",
            textWrap: "nowrap",
          }}
        >
          {user.name}
        </Typography>
      )}
      <AccountCircleOutlinedIcon
        sx={{
          color: "var(--secondaryColor)",
          height: "40px",
          width: "40px",
        }}
      />
    </Box>
  );
}
