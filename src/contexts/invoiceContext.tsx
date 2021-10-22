import React, { createContext, useContext, useState } from "react";

import {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  removeInvoice,
  updateInvoice,
} from "../services/invoice";
import { Severity, useAlert } from "./alertContext";
import { Invoice } from "../util/models";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";

type InvoiceContextType = {
  loading: boolean;
  loadedInvoice: Invoice;
  invoices: Invoice[];
  create: (invoice: Invoice) => void;
  update: (invoice: Invoice) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  getAll: () => void;
};

export const InvoiceContext = createContext({} as InvoiceContextType);

const InvoiceProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [loadedInvoice, setLoadedInvoice] = useState({
    id: null,
    userId: user.id,
    partnerId: null,
    invoiceNumber: '',
    paymentDate: new Date(),
    referenceDate: new Date(),
    value: '',
    notes: '',
  } as Invoice);
  const [loading, setLoading] = useState(false);

  async function create(invoice: Invoice) {
    setLoading(true);

    try {
      const response = await addInvoice(invoice);
      if (response) {
        showAlert({
          text: "Cadastrado com sucesso",
          severity: Severity.SUCCESS,
        });
        router.back();
      }
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function update(invoice: Invoice) {
    setLoading(true);

    try {
      const response = await updateInvoice(invoice);
      if (response) {
        showAlert({
          text: "Atualizado com sucesso",
          severity: Severity.SUCCESS,
        });
        router.back();
      }
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function remove(id: number) {
    setLoading(true);

    try {
      const response = await removeInvoice(id);
      if (response) {
        showAlert({
          text: "Excluido com sucesso",
          severity: Severity.SUCCESS,
        });
      }
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function getById(id: number) {
    setLoading(true);

    try {
      const response = await getInvoiceById(id);
      setLoadedInvoice(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function getAll() {
    setLoading(true);

    try {
      const response = await getAllInvoices();
      setInvoices(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  return (
    <InvoiceContext.Provider
      value={{
        loading,
        loadedInvoice,
        invoices,
        create,
        update,
        remove,
        getById,
        getAll,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoice = () => {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider.");
  }

  return context;
};

export { InvoiceProvider, useInvoice };
