import { useAppDispatch } from "@/hooks/useAppDispatch";
import styles from "./AuthSignIn.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FC, memo, useState } from "react";
import routes from "@/data/routes";
import apiAuthSignIn from "@/api/auth/apiAuthSignIn.api";
import Input from "@/shared/Input";
import { useAppSelector } from "@/hooks/useAppSelector";
import { authSlice } from "@/store/reducers/auth.reducer";
import { NextRouter, useRouter } from "next/router";

const AuthSignIn: FC = memo(() => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const { setAuthLoginAction, setAuthPasswordAction, setAuthErrorAction } =
    authSlice.actions;

  const { login, password, error } = useAppSelector(
    (state) => state.authReducer
  );
  // const [login, setLogin] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string>("");

  const signIn = async () => {
    // const res = await loginUser({ name, password });
    // if (!res.status) {
    //   const errorMessage = res.message;
    //   setError(errorMessage);
    // } else {
    //   const token = res.data;
    //   setName("");
    //   setPassword("");
    //   setError("");
    //   // dispatch(setMainTokenAction(token));
    // }

    const res = await apiAuthSignIn({ login, password });

    if (res.status) {
      router.push(routes.index);
      dispatch(setAuthErrorAction(""));
    } else {
      dispatch(setAuthErrorAction(res.error || ""));
    }
    console.log(res);
  };
  return (
    <>
      <div className={styles.authSignIn}>
        <div className="container">
          <div className={styles.authSignIn_center}>
            <Link href="/">
              <Image src="/images/logo.png" alt="" width={240} height={200} />
            </Link>
          </div>

          <div className={(styles.authSignIn_input, styles.authSignIn_center)}>
            <div className={styles.authSignIn_wrap}>
              <Input
                placeholder="Логин"
                value={login}
                onChange={(e) => dispatch(setAuthLoginAction(e.target.value))}
              />
            </div>
          </div>
          <div className={(styles.authSignIn_input, styles.authSignIn_center)}>
            <div className={styles.authSignIn_wrap}>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) =>
                  dispatch(setAuthPasswordAction(e.target.value))
                }
              />
            </div>
          </div>

          {error ? (
            <div className={styles.authSignIn_center}>
              <div className={styles.authSignIn_wrap}>
                <div className={styles.authSignIn_error}>{error}</div>
              </div>
            </div>
          ) : null}

          <div className={styles.authSignIn_center}>
            <div className={styles.authSignIn_wrap}>
              <a href={routes.auth_forgot_password}>Забыли пароль?</a>
            </div>
          </div>

          <div className={styles.authSignIn_center}>
            <div className={styles.authSignIn_wrap}>
              <button onClick={signIn}>Войти</button>
            </div>
          </div>

          <div className={styles.authSignIn_center}>
            <div className={styles.authSignIn_wrap}>
              <div className={styles.authSignIn_text}>
                Если Вы не зарегистрированы, то вам необходимо пройти
                регистрацию
              </div>
            </div>
          </div>

          <div className="login_mt10  login_center">
            <Link href={routes.auth_sign_up}>
              <button className="button">Зарегистрироваться</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export default AuthSignIn;
