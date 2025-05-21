import apiAuthForgotPassword from "@/api/auth/apiAuthForgotPassword.api";
import errors from "@/constants/errors";
import Input from "@/shared/Input";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX, memo, useEffect, useState } from "react";

const AuthForgotPassword: FC = memo((): JSX.Element => {
  const [emailOrLogin, setEmailOrLogin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const forgotPassword = async () => {
    const res = await apiAuthForgotPassword({ emailOrLogin });
    console.log(res);
    if (!res.status) {
      setError(res.error || errors.unexpected_error);
    } else {
      setError("");
    }
  };

  return (
    <>
      <h1>Для сброса пароля введите логин или почту</h1>

      <Input
        placeholder="Логин или почта"
        value={emailOrLogin}
        onChange={(e) => setEmailOrLogin(e.target.value)}
      />

      {error && <p>error</p>}

      <button onClick={forgotPassword}>Отправить</button>
    </>
  );
});

export default AuthForgotPassword;
