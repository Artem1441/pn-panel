type PasswordCheckResult = { status: true } | { status: false; error: string }

const checkPasswordStrength = (password: string): PasswordCheckResult => {
  if (password.length < 8) {
    return {
      status: false,
      error: "Пароль должен содержать минимум 8 символов",
    }
  }

//   if (!/\d/.test(password)) {
//     return {
//       status: false,
//       message: "Пароль должен содержать хотя бы одну цифру",
//     }
//   }

//   if (!/[A-Z]/.test(password)) {
//     return {
//       status: false,
//       message: "Пароль должен содержать хотя бы одну заглавную букву",
//     }
//   }

//   if (!/[a-z]/.test(password)) {
//     return {
//       status: false,
//       message: "Пароль должен содержать хотя бы одну строчную букву",
//     }
//   }

//   if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//     return {
//       status: false,
//       message:
//         "Пароль должен содержать хотя бы один спецсимвол (!@#$%^&* и т.д.)",
//     }
//   }

  return { status: true }
}

export default checkPasswordStrength
