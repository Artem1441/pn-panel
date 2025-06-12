import routes from "@/data/routes";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX, useEffect } from "react";

const Unauthorized: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    router.push(routes.auth_sign_in)
  }, []);
  return <>Настройки админа</>;
};

export default Unauthorized;
