import React, { ReactNode } from "react";
import { useAuth } from "../contexts/authContext";

interface Props {
  protectedComponent: ReactNode;
  fallBackComponent?: ReactNode;
}

const AuthRenderer: React.FC<Props> = (props: Props) => {
  const { protectedComponent, fallBackComponent } = props;
  const { user } = useAuth();
  return <>{user ? protectedComponent : fallBackComponent}</>;
};

export default AuthRenderer;
