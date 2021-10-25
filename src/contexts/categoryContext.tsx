import React, { createContext, useContext, useState } from "react";

import {
  addCategory,
  getAllCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../services/category";
import { Severity, useAlert } from "./alertContext";
import { Category } from "../util/models";
import { useRouter } from "next/router";

type CategoryContextType = {
  loading: boolean;
  loadedCategory: Category;
  categories: Category[];
  create: (category: Category) => void;
  update: (category: Category) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  getAll: () => void;
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadedCategory, setLoadedCategory] = useState({
    id: null,
    userId: null,
    name: "",
    description: "",
    active: true,
  } as Category);
  const [loading, setLoading] = useState(false);

  async function create(category: Category) {
    setLoading(true);

    try {
      const response = await addCategory(category);
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

  async function update(category: Category) {
    setLoading(true);

    try {
      const response = await updateCategory(category);
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
      const response = await removeCategory(id);
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
      const response = await getCategoryById(id);
      setLoadedCategory(response);
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
      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  return (
    <CategoryContext.Provider
      value={{
        loading,
        loadedCategory,
        categories,
        create,
        update,
        remove,
        getById,
        getAll,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider.");
  }

  return context;
};

export { CategoryProvider, useCategory };
