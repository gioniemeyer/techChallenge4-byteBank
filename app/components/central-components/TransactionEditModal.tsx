"use client";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import TransactionForm from "./TransactionForm"; // versão que delega a onSave
import { useEffect, useMemo } from "react";
import { useTransactionContext } from "@/app/contexts/TransactionContext";

interface TransactionEditModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TransactionEditModal({
  open,
  onClose,
}: TransactionEditModalProps) {
  const { isMobile } = useResponsive();
  const { transactions, editingId, editTransaction, setEditingId } =
    useTransactionContext();

  const current = useMemo(
    () => transactions.find((t) => t.id === editingId) || null,
    [transactions, editingId],
  );

  useEffect(() => {
    if (open && !current) {
      onClose();
    }
  }, [open, current, onClose]);

  const handleCancel = () => {
    setEditingId(null);
    onClose();
  };

  const handleSave = async (data: {
    date: string;
    type: "Depósito" | "Transferência";
    value: number;
  }) => {
    if (!editingId) return;
    await editTransaction(editingId, data.date, data.type, data.value);
    setEditingId(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      slotProps={{ paper: { sx: { margin: 0 } } }}
      onClose={handleCancel}
    >
      <DialogTitle
        sx={{ color: "var(--thirdTextColor)", ml: isMobile ? 0 : 3 }}
      >
        Editar transação
      </DialogTitle>
      <DialogContent>
        <TransactionForm
          initialData={
            current
              ? { date: current.date, type: current.type, value: current.value }
              : { date: "", type: "Depósito", value: 0 }
          }
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
