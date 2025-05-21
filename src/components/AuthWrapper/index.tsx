import React, { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import routes from "@/data/routes";
import Loader from "../Loader";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loading, authenticated } = useAuthStatus();
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (router.pathname === routes.expired) {
      // Ничего не делаем при этих роутах
    } else if (
      !loading &&
      !authenticated &&
      !router.pathname.startsWith("/auth")
    ) {
      router.push(routes.auth_sign_in);
    } else if (
      !loading &&
      authenticated &&
      router.pathname.startsWith("/auth")
    ) {
      router.push(routes.index);
    }
  }, [authenticated, loading]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};
