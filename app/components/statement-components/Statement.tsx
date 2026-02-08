"use client";

import dynamic from "next/dynamic";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { useTransactionManagement } from "@/app/modules/transactions";
import {
  Box,
  Typography,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EditButton from "../buttons/EditButton";
import StatementItem from "./StatementItem";
import FilterButton from "../buttons/FilterButton";

// Lazy load do FormModal (carrega só quando necessário)
const FormModal = dynamic(() => import("../central-components/FormModal"), {
  loading: () => <span>Carregando modal...</span>,
  ssr: false, // garante que o modal seja tratado apenas no client
});

export default function Statement() {
  const { isMobile, isDesktop } = useResponsive();

  const {
    transactions,
    editingId,
    setEditingId,
    deleteTransaction,
    editTransaction,
  } = useTransactionManagement();

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [open, setOpen] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    month: "",
    transactionType: "",
  });

  // Paginação
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const optionsRowsPerPage = [5, 8, 10, 20];

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: { target: { value: number } }) => {
    const value = Number(event.target.value);
    setRowsPerPage(value);
    setPage(1);
  };

  // Filtro
  const filteredTransactions = useMemo(() => {
    const monthQuery = (filters.month || "").trim().toLowerCase();

    return transactions.filter((t) => {
      const date = new Date(t.date);
      const monthLongPt = date
        .toLocaleDateString("pt-BR", { month: "long" })
        .toLowerCase();
      const matchMonth = !monthQuery || monthLongPt.includes(monthQuery);
      const matchType =
        !filters.transactionType || t.type === filters.transactionType;
      return matchMonth && matchType;
    });
  }, [transactions, filters.month, filters.transactionType]);

  // Total de páginas
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / rowsPerPage),
  );

  // Itens paginados
  const paginated = useMemo(() => {
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(start, start + rowsPerPage);
  }, [filteredTransactions, page, rowsPerPage, totalPages]);

  // Sincroniza page se filtros mudarem e reduzirem o total de páginas
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  // Handlers dos botões globais
  const handleEditMode = () => {
    setEditMode((prev) => !prev);
    setDeleteMode(false);
    setEditingId(null);
  };

  const handleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
    setEditMode(false);
    setEditingId(null);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
  };

  // Handler do clique no item
  const handleItemClick = (id: number) => {
    if (editMode) {
      setEditingId(id);
      openModal(); // abrir também no desktop
    }
    if (deleteMode) {
      deleteTransaction(id);
    }
  };

  // Transação atual
  const currentTransaction = useMemo(
    () => transactions.find((t) => t.id === editingId) || null,
    [transactions, editingId],
  );

  return (
    <Box
      sx={{
        width: isDesktop ? "282px" : isMobile ? "312px" : "600px",
        minHeight: isDesktop ? "512px" : "480px",
        height: "100%",
        mt: isDesktop ? 3 : 6,
        borderRadius: "8px",
        backgroundColor: "var(--primaryTextColor)",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: 3,
          width: "240px",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "25px" }}>
          Extrato
        </Typography>

        <Box sx={{ display: "flex" }}>
          <FilterButton
            initialFilters={filters}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
            onApply={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />
          <span onClick={handleEditMode}>
            <EditButton type="edit" editing={editMode} />
          </span>
          <span onClick={handleDeleteMode}>
            <EditButton type="delete" editing={deleteMode} />
          </span>
        </Box>
      </Box>

      {/* Lista com scroll vertical */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: isDesktop ? 420 : 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 1,
          width: "100%",
        }}
      >
        {paginated.map((item, index) => {
          const safeId = item.id ?? index;
          return (
            <StatementItem
              key={safeId}
              id={safeId}
              date={item.date}
              type={item.type}
              value={item.value}
              isClickable={editMode || deleteMode}
              isSelected={editingId === safeId && editMode}
              onClick={() => handleItemClick(safeId)}
            />
          );
        })}
      </Box>

      {/* Rodapé: seletor de rowsPerPage + paginação */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
        py={1}
        px={2}
      >
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="rows-per-page-label">itens / página</InputLabel>
          <Select
            labelId="rows-per-page-label"
            label="Itens por página"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {optionsRowsPerPage.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          size="small"
          sx={{
            "& .MuiPaginationItem-root": { color: "var(--thirdTextColor)" },
            "& .MuiPaginationItem-icon, & .MuiPaginationItem-ellipsis": {
              color: "var(--thirdTextColor)",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--primaryColor)",
              color: "var(--primaryTextColor)",
            },
            "& .MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "var(--primaryColor)",
              opacity: 0.9,
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
            "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast":
              { color: "#000" },
          }}
        />
      </Stack>

      {/* Modal de edição - lazy e controlado */}
      {open && (
        <FormModal
          open={open}
          onClose={closeModal}
          current={
            currentTransaction
              ? {
                  date: currentTransaction.date,
                  type: currentTransaction.type,
                  value: currentTransaction.value,
                }
              : null
          }
          onSave={async (data) => {
            if (!editingId) return;
            try {
              await editTransaction(
                editingId,
                data.date,
                data.type,
                data.value,
              );
              closeModal();
            } catch (e) {
              console.error("Erro ao salvar edição:", e);
            }
          }}
        />
      )}
    </Box>
  );
}
