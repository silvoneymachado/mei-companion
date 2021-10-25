import React, { createContext, useContext, useState } from "react";

import {
  addExpense,
  getAllExpenses,
  getExpenseByDate,
  getExpenseById,
  removeExpense,
  updateExpense,
} from "../services/expense";
import { Severity, useAlert } from "./alertContext";
import { Expense } from "../util/models";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";

type ExpenseContextType = {
  loading: boolean;
  loadedExpense: Expense;
  expenses: Expense[];
  create: (expense: Expense) => void;
  update: (expense: Expense) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  getAll: () => void;
  getByDate: (date: Date) => void;
};

export const ExpenseContext = createContext({} as ExpenseContextType);

const ExpenseProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [loadedExpense, setLoadedExpense] = useState({
    userId: user.id,
    name: '',
    partnerId: 0,
    value: '',
    notes: '',
    paymentDate: new Date(),
    referenceDate: new Date(),
    categoryId: null,
  } as Expense);
  const [loading, setLoading] = useState(false);

  async function create(expense: Expense) {
    setLoading(true);

    try {
      const response = await addExpense(expense);
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

  async function update(expense: Expense) {
    setLoading(true);

    try {
      const response = await updateExpense(expense);
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
      const response = await removeExpense(id);
      if (response) {
        showAlert({
          text: "Excluido com sucesso",
          severity: Severity.SUCCESS,
        });
        getAll();
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
      const response = await getExpenseById(id);
      setLoadedExpense(response);
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
      const response = await getAllExpenses();
      setExpenses(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function getByDate(date: Date) {
    setLoading(true);

    try {
      const response = await getExpenseByDate(date);
      setExpenses(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }


  return (
    <ExpenseContext.Provider
      value={{
        loading,
        loadedExpense,
        expenses,
        create,
        update,
        remove,
        getById,
        getAll,
        getByDate
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpense = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider.");
  }

  return context;
};

export { ExpenseProvider, useExpense };
