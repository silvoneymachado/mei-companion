import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";

const AuthGuard: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isUser = !!user;

  const signIn = () => {
    router.replace("/");
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
  return <div>Loading...</div>;
};

export default AuthGuard;
