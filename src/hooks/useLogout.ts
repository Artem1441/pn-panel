import apiAuthLogout from "@/api/auth/apiAuthLogout.api";
import routes from "@/data/routes";
import { NextRouter, useRouter } from "next/router";
import { useAuthStatus } from "./useAuthStatus";

const useLogout = () => {
  const router: NextRouter = useRouter();

  const logout = async (): Promise<void> => {
    try {
      const res = await apiAuthLogout();
      if (res.status) {
        router.push(routes.auth_sign_in);
      } else alert("Logout failed: Что-то пошло не так");
    } catch (error) {
      alert("Что-то пошло не так");
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

export default useLogout;
