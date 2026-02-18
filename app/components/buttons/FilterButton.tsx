"use client";

import { useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  IconButton,
  Menu,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  TextField,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";

interface FilterValues {
  month: string;
  transactionType: string;
}

interface FilterButtonProps {
  initialFilters?: FilterValues;
  onChange?: (filters: FilterValues) => void; // chamado em debounce para mês (>= 3 chars)
  onApply?: (filters: FilterValues) => void; // chamado ao clicar "Aplicar"
  debounceMs?: number;
  minChars?: number; // mínimo de caracteres para ativar filtro do mês
}

export default function FilterButton({
  initialFilters,
  onChange,
  onApply,
  debounceMs = 400,
  minChars = 3,
}: FilterButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Filtros confirmados
  const [filters, setFilters] = useState<FilterValues>({
    month: initialFilters?.month ?? "",
    transactionType: initialFilters?.transactionType ?? "",
  });

  // Draft do mês (campo de digitação) - independente do filtro confirmado
  const [monthDraft, setMonthDraft] = useState<string>(filters.month);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Tipo de transação (imediato)
  const handleTypeChange = (value: string) => {
    const merged: FilterValues = {
      month: filters.month, // mantém o mês confirmado
      transactionType: value ?? "",
    };
    setFilters(merged);
    onChange?.(merged);
  };

  // Debounce do mês: somente dispara quando >= minChars; senão, limpa o filtro de mês
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      // Se digitou menos que minChars, considere month como vazio (sem filtro por mês)
      const normalizedMonth = monthDraft.trim();
      const effectiveMonth =
        normalizedMonth.length >= minChars ? normalizedMonth : "";

      // Só dispara se houver mudança real
      if (effectiveMonth !== filters.month) {
        const merged: FilterValues = {
          month: effectiveMonth,
          transactionType: filters.transactionType,
        };
        setFilters(merged);
        onChange?.(merged);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // Observa apenas o draft + tempo (não re-agenda com updates de filters)
  }, [monthDraft, debounceMs, minChars]);

  // Limpar filtros
  const clearFilters = () => {
    const cleared: FilterValues = { month: "", transactionType: "" };
    setFilters(cleared);
    setMonthDraft("");
    onChange?.(cleared);
  };

  // Aplicar (confirma draft -> respeita minChars)
  const handleApply = () => {
    const normalizedMonth = monthDraft.trim();
    const effectiveMonth =
      normalizedMonth.length >= minChars ? normalizedMonth : "";

    const applied: FilterValues = {
      month: effectiveMonth,
      transactionType: filters.transactionType,
    };
    setFilters(applied);
    onApply?.(applied);
    handleClose();
  };

  // Sincroniza drafts com initialFilters
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        month: initialFilters.month ?? "",
        transactionType: initialFilters.transactionType ?? "",
      });
      setMonthDraft(initialFilters.month ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters?.month, initialFilters?.transactionType]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          backgroundColor: "var(--primaryColor)",
          color: "var(--primaryTextColor)",
          width: "40px",
          height: "40px",
          mr: 1,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "var(--primaryTextColor)",
            color: "var(--primaryColor)",
          },
        }}
        aria-label="Abrir filtros"
      >
        <FilterAltIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { p: 2, width: 320 } }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
            Filtros
          </Typography>
          <Divider />

          {/* Mês (debounce + mínimo de caracteres) */}
          <TextField
            size="small"
            label="Mês (ex.: Novembro)"
            placeholder={`Digite pelo menos ${minChars} caracteres`}
            value={monthDraft}
            onChange={(e) => setMonthDraft(e.target.value)}
            fullWidth
          />

          {/* Tipo de transação (imediato) */}
          <FormControl size="small" fullWidth>
            <InputLabel id="type-label">Tipo de Transação</InputLabel>
            <Select
              labelId="type-label"
              label="Tipo de Transação"
              value={filters.transactionType ?? ""}
              onChange={(e) => handleTypeChange(e.target.value)}
              input={<OutlinedInput label="Tipo de Transação" />}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value="Depósito">Depósito</MenuItem>
              <MenuItem value="Transferência">Transferência</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" gap={1} mt={1}>
            <IconButton
              onClick={clearFilters}
              sx={{
                backgroundColor: "var(--secondaryColor)",
                fontSize: "14px",
                fontWeight: "700",
                color: "var(--primaryTextColor)",
                "&:hover": {
                  backgroundColor: "var(--primaryTextColor)",
                  color: "var(--secondaryColor)",
                },
              }}
              aria-label="Limpar filtros"
            >
              Limpar
            </IconButton>
            <IconButton
              onClick={handleApply}
              sx={{
                backgroundColor: "var(--primaryColor)",
                fontSize: "14px",
                fontWeight: "700",
                color: "var(--primaryTextColor)",
                "&:hover": {
                  backgroundColor: "var(--primaryTextColor)",
                  color: "var(--primaryColor)",
                },
                ml: "auto",
              }}
              aria-label="Aplicar filtros"
            >
              Aplicar
            </IconButton>
          </Box>
        </Box>
      </Menu>
    </>
  );
}
