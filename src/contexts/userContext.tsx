import React, { createContext, useContext, useState, useEffect } from "react";

import {
  getUserById,
  removeUser,
  updateUser,
} from "../services/user";
import { Severity, useAlert } from "./alertContext";
import { User } from "../util/models";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";
import { changePass } from "../services/changePass";

type UserContextType = {
  loading: boolean;
  loadedUser: User;
  update: (user: User) => void;
  remove: (id: number) => void;
  getById: (id: number) => void;
  changeUserPass: (user: User) => void;
};

export const UserContext = createContext({} as UserContextType);

const UserProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loadedUser, setLoadedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user.id){
      getById(user.id);
    }
  }, [user])

  async function update(user: User) {
    setLoading(true);

    try {
      const response = await updateUser(user);
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
      const response = await removeUser(id);
      if (response) {
        showAlert({
          text: "Excluido com sucesso",
          severity: Severity.SUCCESS,
        });
        signOut();
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
      const response = await getUserById(id);
      setLoadedUser(response);
    } catch (error) {
      showAlert({
        text: `${error.response.data.statusText}`,
        severity: Severity.ERROR,
      });
    }

    setLoading(false);
  }

  async function changeUserPass(user: User) {
    setLoading(true);

    try {
      const response = await changePass(user);
      if (response) {
        showAlert({
          text: "Alterada com sucesso",
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

  return (
    <UserContext.Provider
      value={{
        loading,
        loadedUser,
        update,
        remove,
        getById,
        changeUserPass
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider.");
  }

  return context;
};

export { UserProvider, useUser };
