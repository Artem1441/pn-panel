import apiAuthStatus from "@/api/auth/apiAuthStatus.api";
import { generalSlice } from "@/store/reducers/general.reducer";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";

export const useAuthStatus = () => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const [authStatus, setAuthStatus] = useState<{
    loading: boolean;
    authenticated: boolean;
    error?: string;
  }>({ loading: true, authenticated: false });

  const checkAuthStatus = async () => {
    const { setGeneralRoleAction } = generalSlice.actions;

    try {
      const result = await apiAuthStatus();

      if (result.status) {
        setAuthStatus({
          loading: false,
          authenticated: true,
        });
        dispatch(setGeneralRoleAction(result.data?.role || "specialist"));
      } else {
        setAuthStatus({
          loading: false,
          authenticated: false,
          error: result.error || "Не удалось проверить статус аутентификации",
        });
        dispatch(setGeneralRoleAction("unauthorized"));
      }
    } catch (error) {
      console.error("Ошибка при проверке статуса аутентификации:", error);
      setAuthStatus({
        loading: false,
        authenticated: false,
        error: "Произошла непредвиденная ошибка",
      });
      dispatch(setGeneralRoleAction("unauthorized"));
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [router]);

  return { ...authStatus };
};
