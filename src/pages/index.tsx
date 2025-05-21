import useLogout from "@/hooks/useLogout";
import Home from "@/modules/home/components/Home";
import { FC, JSX } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = (): JSX.Element => {
  const { t } = useTranslation();

  const logout = useLogout();

  return (
    <>
      {/* <p>{t("help")}</p> */}

      <Home />

      <button onClick={logout}>Выйти</button>
    </>
  );
};

export default IndexPage;
