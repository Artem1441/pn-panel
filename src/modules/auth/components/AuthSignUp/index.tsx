import apiAuthSignUpStage from "@/api/auth/apiAuthSignUpStage.api";
import routes from "@/data/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { authSlice } from "@/store/reducers/auth.reducer";
import { NextRouter, useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import AuthSignUpAccessionAgreement from "../AuthSignUpAccessionAgreement";
import AuthSignUpAcquaintance from "../AuthSignUpAcquaintance";
import AuthSignUpIdentificationData from "../AuthSignUpIdentificationData";
import AuthSignUpPersonalData from "../AuthSignUpPersonalData";
import AuthSignUpWaitingRoom from "../AuthSignUpWaitingRoom";

const AuthSignUp: FC = memo(() => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const { setAuthStageAction } = authSlice.actions;
  const { stage } = useAppSelector((state) => state.authReducer);

  const getSignUpStage = async () => {
    try {
      const res = await apiAuthSignUpStage(); // Ждем ответа от API

      if (!res.status) {
        dispatch(setAuthStageAction("accession agreement"));
        // Если статус успеха, сохраняем данные в хранилище (Redux или другой механизм)
        // dispatch(setAuthStageAction(res.data));
      } else {
        if (res.data) dispatch(setAuthStageAction(res.data));
        // // Если статус ошибки, устанавливаем заглушку
        // dispatch(setAuthStageAction("accession agreement"));
      }
    } catch (error) {
      // В случае ошибки (например, проблемы с сетью)
      console.error("Error during sign-up stage request:", error);
      dispatch(setAuthStageAction("accession agreement"));
    }
  };

  useEffect(() => {
    getSignUpStage();
  }, []);

  if (stage === "home page") {
    router.push(routes.index);
  }

  return (
    <>
      {stage === "accession agreement" ? (
        <AuthSignUpAccessionAgreement />
      ) : stage === "acquaintance" ? (
        <AuthSignUpAcquaintance />
      ) : stage === "identification data" ? (
        <AuthSignUpIdentificationData />
      ) : stage === "personal data" ? (
        <AuthSignUpPersonalData />
      ) : stage === "waiting room" ? (
        <AuthSignUpWaitingRoom />
      ) : (
        <></>
      )}
    </>
  );
});

export default AuthSignUp;
