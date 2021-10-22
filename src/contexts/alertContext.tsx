import React, { createContext, useContext, useState } from "react";

export enum Severity {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

interface AlertContextData {
  isAlertOpen: boolean;
  alertText: string;
  alertSeverity: Severity;
  alertTitle: string;
  dismissAlert: () => void;
  showAlert: (showAlertOpts: ShowAlert) => void;
}

interface ShowAlert {
  text: string;
  severity?: Severity;
  title?: string;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

const AlertProvider: React.FC = ({ children }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>(Severity.INFO);
  const [alertTitle, setAlertTitle] = useState("");

  const dismissAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  function showAlert({
    text,
    severity = Severity.INFO,
    title = "",
  }: ShowAlert): void {
    setIsAlertOpen(true);
    setAlertText(text);
    setAlertSeverity(severity);
    setAlertTitle(title);
  }

  return (
    <AlertContext.Provider
      value={{
        isAlertOpen,
        alertText,
        alertSeverity,
        alertTitle,
        dismissAlert,
        showAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider.");
  }

  return context;
};

export { AlertProvider, useAlert };
