import { Container, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../contexts/authContext";

const AuthGuard: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  const [message, setMessage] = useState('Carregando...')
  const router = useRouter();
  const isUser = !!user;

  const signIn = () => {
    setMessage('Você precisa realizar o login para acessar este recurso. Você será redirecionado em 5 segundos.');

    setTimeout(() => {
      router.replace("/");
    }, 5000);
  };
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Layout>
      <Container maxWidth="sm" style={{ marginTop: 30 }}>
        <Typography variant="h5">{message}</Typography>
      </Container>
    </Layout>
  );
};

export default AuthGuard;
