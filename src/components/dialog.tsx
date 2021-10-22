import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog as MuiDialog,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onConfirm: () => void;
  contentText: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

const Dialog: React.FC<Props> = (props: Props) => {
  const {
    open,
    onConfirm,
    contentText,
    title,
    confirmText,
    cancelText,
    onCancel,
  } = props;

  return (
      <MuiDialog
        open={open}
        aria-labelledby={`alert-dialog-${title ?? "no-title"}`}
        aria-describedby="alert-dialog-confirm-cancel"
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText id="alert-dialog-confirm-cancel">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="info">{cancelText ?? "Cancelar"}</Button>
          <Button onClick={onConfirm} autoFocus color="error">
            {confirmText ?? "Confirmar"}
          </Button>
        </DialogActions>
      </MuiDialog>
  );
};

export default Dialog;
