import React, { createContext, useContext, useState } from "react";

import {
  addPartner,
  getAllPartners,
  getPartnerById,
  removePartner,
  updatePartner,
} from "../services/partner";
import { Severity, useAlert } from "./alertContext";
import { Partner } from "../util/models";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";

type PartnerContextType = {
  loading: boolean;
  loadedPartner: Partner;
  partners: Partner[];
  create: (partner: Partner) => void;
  update: (partner: Partner) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  getAll: () => void;
};

export const PartnerContext = createContext({} as PartnerContextType);

const PartnerProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();
  const [partners, setPartners] = useState<Partner[] | null>(null);
  const [loadedPartner, setLoadedPartner] = useState({
    id: null,
    userId: user.id,
    name: "",
    cnpj: "",
    corporateName: "",
  } as Partner);
  const [loading, setLoading] = useState(false);

  async function create(partner: Partner) {
    setLoading(true);

    try {
      const response = await addPartner(partner);
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

  async function update(partner: Partner) {
    setLoading(true);

    try {
      const response = await updatePartner(partner);
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
      const response = await removePartner(id);
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
      const response = await getPartnerById(id);
      setLoadedPartner(response);
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
      const response = await getAllPartners();
      setPartners(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  return (
    <PartnerContext.Provider
      value={{
        loading,
        loadedPartner,
        partners,
        create,
        update,
        remove,
        getById,
        getAll,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

const usePartner = () => {
  const context = useContext(PartnerContext);

  if (!context) {
    throw new Error("usePartner must be used within an PartnerProvider.");
  }

  return context;
};

export { PartnerProvider, usePartner };
