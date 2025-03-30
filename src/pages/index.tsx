import routes from "@/data/routes";
import { NextRouter, useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import LoginArea from "../src/components/LoginArea";
// import MainArea from "../src/components/MainArea";
// import { setMainTokenAction } from "../src/store/reducers/main.reducer";
// import { IReducers } from "../src/store/types";
// import { getSession } from "../src/utils/sessions";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  // const dispatch = useDispatch();
  // const { token } = useSelector(
  //   (state: IReducers) => state.MainReducer
  // );
  const token = null;
  const router: NextRouter = useRouter();

  useEffect(() => {
    // const token = getSession("token");
    // if (token) dispatch(setMainTokenAction(token));
  }, []);

  useEffect(() => {
    if (token === null) {
      router.push(routes.auth_sign_in);
    }
  }, [token]);

  return (
    <>
      <p>{t("help")}</p>
    </>
  );
};

export default IndexPage;
