import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = !!session?.user;

  const signIn = () => {
    router.replace("/signin")
  };
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default AuthGuard;
