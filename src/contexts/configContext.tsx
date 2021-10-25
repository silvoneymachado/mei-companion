import React, { createContext, useContext, useEffect, useState } from "react";

import {
  addConfig,
  getAllConfigs,
  getConfigById,
  removeConfig,
  updateConfig,
} from "../services/config";
import { Severity, useAlert } from "./alertContext";
import { Config } from "../util/models";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";

type ConfigContextType = {
  loading: boolean;
  loadedConfig: Config;
  configs: Config[];
  create: (config: Config) => void;
  update: (config: Config) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  getAll: () => void;
};

const anualInvoiceLimit = Number(process.env.NEXT_PUBLIC_ANNUAL_INVOICE_LIMIT)

export const ConfigContext = createContext({} as ConfigContextType);

const ConfigProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();
  const [configs, setConfigs] = useState<Config[] | null>(null);
  const [loadedConfig, setLoadedConfig] = useState({
    id: null,
    userId: null,
    name: "",
    value: 0,
    active: true,
  } as Config);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      initLimitConfig();
    }
  }, [user]);

  async function initLimitConfig() {
    try {
      const initialConfig: Config = {
        id: 0,
        userId: user.id,
        name: "Limite anual de faturamento",
        active: true,
        value: anualInvoiceLimit,
      };
      const configZero = await getConfigById(0);
      if (configZero) {
        return;
      } else {
        await addConfig(initialConfig);
      }
    } catch (error) {
      showAlert({
        text: "Erro ao inicializar as configurações",
        severity: Severity.ERROR,
      });
    }
  }

  async function create(config: Config) {
    setLoading(true);

    try {
      const response = await addConfig(config);
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

  async function update(config: Config) {
    setLoading(true);

    try {
      const response = await updateConfig(config);
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
      const response = await removeConfig(id);
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
      const response = await getConfigById(id);
      setLoadedConfig(response);
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
      const response = await getAllConfigs();
      setConfigs(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  return (
    <ConfigContext.Provider
      value={{
        loading,
        loadedConfig,
        configs,
        create,
        update,
        remove,
        getById,
        getAll,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within an ConfigProvider.");
  }

  return context;
};

export { ConfigProvider, useConfig };
