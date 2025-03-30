import { useAppDispatch } from "@/hooks/useAppDispatch";
import styles from "./AuthSignIn.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FC, memo, useState } from "react";
import routes from "@/data/routes";

const AuthSignIn: FC = memo(() => {
  const dispatch = useAppDispatch();
  //   const { name, password, error } = useSelector(
  //     (state: IReducers) => state.AuthReducer
  //   );
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = async () => {
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
              <input
                type="text"
                placeholder="Имя или номер телефона"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className={(styles.authSignIn_input, styles.authSignIn_center)}>
            <div className={styles.authSignIn_wrap}>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className={styles.authSignIn_center}>
              <div className={styles.authSignIn_wrap}>
                <div className={styles.authSignIn_error}>{error}</div>
              </div>
            </div>
          )}

          <div className={styles.authSignIn_center}>
            <div className={styles.authSignIn_wrap}>
              <a href={routes.auth_forgot_password}>Забыли пароль?</a>
            </div>
          </div>

          <div className={styles.authSignIn_center}>
            <div className={styles.authSignIn_wrap}>
              <button onClick={login}>Войти</button>
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

          {/* <div className="login_center">
            <div className="login_wrap">
              <div className="login_text">
                Если Вы не зарегистрированы, то ознакомьтесь с договором
                присоединения:
              </div>
            </div>
          </div>




       <div className="login_center">
            <div className="login_wrap">
              <div className="login_contact">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>

          <div className="login_mt10  login_center">
            <Link href="/welcome">
              <button className="button">Ознакомлен (-а)</button>
            </Link>
          </div>

          <div className="login_footer login_center">2024</div> */}
        </div>
      </div>
    </>
  );
});

export default AuthSignIn;
