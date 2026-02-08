"use client";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import TransactionForm from "./TransactionForm";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  current: {
    date: string;
    type: "Depósito" | "Transferência";
    value: number;
  } | null;
  onSave: (data: {
    date: string;
    type: "Depósito" | "Transferência";
    value: number;
  }) => void;
}

export default function FormModal({
  open,
  onClose,
  current,
  onSave,
}: FormModalProps) {
  const { isMobile } = useResponsive();

  return (
    <Dialog
      open={open}
      slotProps={{ paper: { sx: { margin: 0 } } }}
      onClose={onClose}
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
          onCancel={onClose}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
