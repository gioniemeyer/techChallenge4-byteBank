"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { useTransactions } from "@/app/contexts/TransactionContext";
import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import FormModal from "../central-components/FormModal";
import EditButton from "../buttons/EditButton";
import StatementItem from "./StatementItem";
import FilterButton from "../buttons/FilterButton";

/** Componente de extrato */
export default function Statement() {
  const { isMobile, isDesktop } = useResponsive();
  const { transactions, editingId, setEditingId, deleteTransaction } =
    useTransactions();

  // Estados para modo de edição e exclusão
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [open, setOpen] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    month: "", // texto digitado: ex. "Novembro", "nov", "Fev"
    transactionType: "", // ex. "Entrada", "Saída", "Transferência"
  });

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

  // Filtro de transações (mês digitado + tipo de transação)
  const filteredTransactions = useMemo(() => {
    const monthQuery = (filters.month || "").trim().toLowerCase();

    return transactions.filter((t) => {
      const date = new Date(t.date);

      // Nome do mês em pt-BR no mesmo formato do StatementItem
      const monthLongPt = date
        .toLocaleDateString("pt-BR", { month: "long" })
        .toLowerCase(); // exemplo: "novembro"

      // match de mês: se digitou algo, verifica se contém (aceita prefixo/parcial)
      const matchMonth = !monthQuery || monthLongPt.includes(monthQuery);

      // match de tipo: compara quando selecionado (ajuste o texto para casar com o seu t.type)
      const matchType =
        !filters.transactionType || t.type === filters.transactionType;

      return matchMonth && matchType;
    });
  }, [transactions, filters.month, filters.transactionType]);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
  };

  // Handler do clique no item
  const handleItemClick = (id: number) => {
    if (editMode) {
      setEditingId(id);

      if (!isDesktop) {
        openModal();
      }
    }
    if (deleteMode) {
      deleteTransaction(id);
    }
  };

  return (
    <Box
      sx={{
        width: isDesktop ? "282px" : isMobile ? "312px" : "600px",
        minHeight: isDesktop ? "512px" : "480px",
        height: "100%",
        mt: isDesktop ? 3 : 6,
        borderRadius: "8px",
        backgroundColor: "var(--primaryTextColor)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            m: 3,
            width: "240px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "25px",
            }}
          >
            Extrato
          </Typography>

          <Box sx={{ display: "flex" }}>
            <span onClick={handleEditMode}>
              <EditButton type="edit" editing={editMode} />
            </span>
            <span onClick={handleDeleteMode}>
              <EditButton type="delete" editing={deleteMode} />
            </span>
            <span>
              <FilterButton
                initialFilters={filters}
                onChange={setFilters}
                onApply={setFilters}
              />
            </span>
          </Box>
        </Box>

        {/* Use as transações filtradas */}
        {filteredTransactions.map((item) => (
          <StatementItem
            key={item.id}
            id={item.id}
            date={item.date}
            type={item.type}
            value={item.value}
            isClickable={editMode || deleteMode}
            isSelected={editingId === item.id && editMode}
            onClick={() => handleItemClick(item.id)}
          />
        ))}

        <FormModal open={open} onClose={closeModal} />
      </Box>
    </Box>
  );
}
