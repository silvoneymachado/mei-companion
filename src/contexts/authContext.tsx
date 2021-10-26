import React, { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken';

import { signInRequest } from "../services/auth";
import { api } from "../services/api";
import { Severity, useAlert } from "./alertContext";
import { User } from "../util/models";

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

const  AuthProvider: React.FC = ({ children }) => {
  const { showAlert } = useAlert();
  const [user, setUser] = useState<User | null>(null)
  const [ loading, setLoading] = useState(false);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    setLoading(true);
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      const jwtToken = jwt.decode(token);
      setUser(jwtToken as User);
    }
    setLoading(false);
  }, [])

  async function signIn({ email, password }: SignInData) {
    setLoading(true);
    try {
      const { token, user } = await signInRequest({
        email,
        password,
      })
  
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
  
      api.defaults.headers['Authorization'] = `${token}`;
  
      setUser(user);
      
      router.replace('/dashboard');
    } catch (error) {
      showAlert({ text: `${error.response.data.statusText}`, severity: Severity.ERROR });
      setLoading(false);
    }
    setLoading(false);
  }

  function signOut() {
    setLoading(true);
    destroyCookie(undefined, 'nextauth.token');
    setLoading(false);
    router.replace('/home');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};

export { AuthProvider, useAuth };
