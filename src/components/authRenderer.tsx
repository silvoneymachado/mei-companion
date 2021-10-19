import { useSession } from "next-auth/client";
import React, { ReactNode } from "react";

interface Props {
  protectedComponent: ReactNode;
  fallBackComponent?: ReactNode;
}

const AuthRenderer: React.FC<Props> = (props: Props) => {
  const { protectedComponent, fallBackComponent } = props;
  const [session] = useSession();
  return <>{session ? protectedComponent : fallBackComponent}</>;
};

export default AuthRenderer;
