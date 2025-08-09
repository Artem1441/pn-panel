import apiAuthForgotPassword from "@/api/auth/apiAuthForgotPassword.api"
import apiAuthResetPassword from "@/api/auth/apiAuthResetPassword.api"
import apiAuthResetPasswordToken from "@/api/auth/apiAuthResetPasswordToken.api"
import errors from "@/constants/errors"
import routes from "@/data/routes"
import Input from "@/shared/Input"
import { NextRouter, useRouter } from "next/router"
import { FC, JSX, memo, useEffect, useState } from "react"

const AuthResetPassword: FC = memo((): JSX.Element => {
  const router: NextRouter = useRouter()
  const [password, setPassword] = useState<string>("")
  const [passwordCopy, setPasswordCopy] = useState<string>("")
  const [token, setToken] = useState<string>("")
  const [error, setError] = useState<string>("")

  const resetPassword = async () => {
    if (password !== passwordCopy) return setError(errors.password_mismatch)
    if (password.length < 8) return setError(errors.password_too_short)

    const res = await apiAuthResetPassword(token, password)
    if (res.status) {
      setError("")
      router.push(routes.auth_sign_in)
    } else {
      setError(res.error || "")
    }
  }

  const isActiveLink = async () => {
    if (typeof router.query.token === "string") {
      const res = await apiAuthResetPasswordToken(router.query.token)
      if (!res.status) return router.push(routes.expired)
      setToken(router.query.token)
    }
  }

  useEffect(() => {
    isActiveLink()
  }, [router.query])

  return (
    <>
      <h1>Введите новый пароль</h1>

      <Input
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Повторите пароль"
        value={passwordCopy}
        onChange={(e) => setPasswordCopy(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={resetPassword}>Отправить</button>
    </>
  )
})

export default AuthResetPassword
