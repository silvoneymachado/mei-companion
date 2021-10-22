import React from 'react';
import { Stack, Alert, AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "../contexts/alertContext";

const AlertComponent: React.FC = () => {
  const { isAlertOpen, alertText, alertSeverity, alertTitle, dismissAlert } =
    useAlert();

  return (
    <>
      {isAlertOpen && (
        <Stack
          sx={{
            width: "100%",
            position: "absolute",
            zIndex: 9999,
            paddingX: 30,
          }}
          spacing={2}
        >
          <Alert
            variant="filled"
            severity={alertSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dismissAlert();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {!!alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
            {alertText}
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default AlertComponent;
