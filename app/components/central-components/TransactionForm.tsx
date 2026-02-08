"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import type { SxProps, Theme } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type TransactionFormProps = {
  initialData?: {
    date: string;
    type: "Depósito" | "Transferência";
    value: number;
  };
  onCancel: () => void;
  onSave: (data: {
    date: string;
    type: "Depósito" | "Transferência";
    value: number;
  }) => void;
};

export default function TransactionForm({
  initialData,
  onCancel,
  onSave,
}: TransactionFormProps) {
  const { isMobile, isDesktop } = useResponsive();

  // Estado do formulário
  const [type, setType] = useState<"" | "d" | "t">("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // Preenche os campos ao receber initialData
  useEffect(() => {
    if (initialData) {
      setType(initialData.type === "Depósito" ? "d" : "t");
      setValue(initialData.value.toFixed(2).replace(".", ","));
    } else {
      setType("");
      setValue("");
    }
    setError("");
  }, [initialData]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as "d" | "t");
  };

  const submitForm = async () => {
    const valueRegex = /^\d+,\d{2}$/;
    if (!valueRegex.test(value)) {
      setError("Informe o valor no formato 00,00");
      return;
    }

    setError("");
    const data = {
      date: initialData ? initialData.date : new Date().toISOString(),
      type: (type === "d" ? "Depósito" : "Transferência") as
        | "Depósito"
        | "Transferência",
      value: parseFloat(value.replace(",", ".")),
    };

    await onSave(data);
  };

  // Responsividade do container principal
  let sx: SxProps<Theme>;
  if (isDesktop) {
    sx = {
      mt: 3,
      ml: 3,
      width: "355px",
      display: "flex",
      alignItems: "left",
      flexDirection: "column",
      gap: 2,
    };
  } else if (isMobile) {
    sx = {
      mt: 3,
      width: "280px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: 2,
    };
  } else {
    sx = {
      mt: 3,
      ml: 3,
      width: "355px",
      display: "flex",
      alignItems: "left",
      flexDirection: "column",
      gap: 2,
    };
  }

  return (
    <Box sx={sx}>
      <FormControl
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "48px",
            backgroundColor: "var(--primaryTextColor)",
            borderRadius: "8px",
          },
        }}
      >
        <Select
          value={type}
          onChange={handleTypeChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected)
              return (
                <span style={{ color: "#999" }}>
                  Selecione o tipo de transação
                </span>
              );
            return selected === "d" ? "Depósito" : "Transferência";
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
              borderWidth: "1px",
            },
          }}
        >
          <MenuItem
            value="d"
            sx={{
              "&:hover, &.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "var(--background)",
              },
            }}
          >
            Depósito
          </MenuItem>
          <MenuItem
            value="t"
            sx={{
              "&:hover, &.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "var(--background)",
              },
            }}
          >
            Transferência
          </MenuItem>
        </Select>
      </FormControl>

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          color: "var(--thirdTextColor)",
          mt: 3,
        }}
      >
        Valor
      </Typography>

      <TextField
        value={value}
        onChange={(e) => {
          const input = e.target.value;
          const regex = /^\d*(,?\d{0,2})?$/;
          if (regex.test(input)) {
            setValue(input);
            setError("");
          }
        }}
        helperText={error}
        id="outlined-basic"
        placeholder="00,00"
        variant="outlined"
        sx={{
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            height: "48px",
            backgroundColor: "var(--primaryTextColor)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primaryColor)",
              borderWidth: "1px",
            },
          },
          "& .MuiFormHelperText-root": {
            color: "red",
            fontSize: "12px",
            height: "10px",
            mt: 1,
            ml: 1,
            backgroundColor: "transparent",
          },
          mb: 2,
          width: isMobile ? "144px" : "250px",
        }}
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          onClick={submitForm}
          disabled={!type || !value}
          variant="contained"
          sx={{
            color: "var(--primaryTextColor)",
            backgroundColor: "var(--primaryColor)",
            width: isMobile ? "144px" : "250px",
            height: "48px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "16px",
            textTransform: "none",
            "&.Mui-disabled": {
              backgroundColor: "var(--thirdTextColor)",
              color: "var(--primaryTextColor)",
              opacity: 0.9,
            },
          }}
        >
          Salvar
        </Button>

        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            color: "var(--primaryColor)",
            width: isMobile ? "144px" : "250px",
            height: "48px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "16px",
            textTransform: "none",
            borderColor: "var(--primaryColor)",
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
