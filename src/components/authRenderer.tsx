/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAuth } from "../contexts/authContext";

interface Props {
  protectedComponent: any;
  fallBackComponent?: any;
}

const AuthRenderer: React.FC<Props> = (props: Props) => {
  const { protectedComponent, fallBackComponent } = props;
  const { user } = useAuth();
  return <>{user ? protectedComponent : fallBackComponent}</>;
};

export default AuthRenderer;
