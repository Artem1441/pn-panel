import apiAuthSignUpCheckIdentificationData from "@/api/auth/apiAuthSignUpCheckIdentificationData.api";
import apiAuthSignUpConfirmCode from "@/api/auth/apiAuthSignUpConfirmCode.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Input from "@/shared/Input";
import { authSlice } from "@/store/reducers/auth.reducer";
import checkIdentificationData from "@/utils/checkIdentificationData";
import cleanPhone from "@/utils/cleanPhone";
import { useState } from "react";

const AuthSignUpIdentificationData = () => {
  const dispatch = useAppDispatch();
  const {
    setAuthStageAction,
    setAuthNameAction,
    setAuthSurnameAction,
    setAuthPatronymicAction,
    setAuthPhoneAction,
    setAuthEmailAction,
    setAuthInnAction,
    setAuthConfirmationCodeSentAction,
    setAuthErrorAction,
  } = authSlice.actions;

  const {
    name,
    surname,
    patronymic,
    phone,
    email,
    inn,
    error,
    confirmationCodeSent,
  } = useAppSelector((state) => state.authReducer);

  const [codePhone, setCodePhone] = useState("");
  const [codeEmail, setCodeEmail] = useState("");

  const checkSignUpIdentificationData = async () => {
    const isCorrectData = checkIdentificationData({
      name,
      surname,
      patronymic,
      phone,
      email,
      inn,
    });

    if (!isCorrectData.status) {
      return dispatch(setAuthErrorAction(isCorrectData.error || ""));
    }

    const res = await apiAuthSignUpCheckIdentificationData({
      name,
      surname,
      patronymic,
      phone: cleanPhone(phone),
      email,
      inn,
    });

    console.log(res);

    if (res.status) {
      dispatch(setAuthErrorAction(""));
      dispatch(setAuthConfirmationCodeSentAction(true));
      // return dispatch(setAuthStageAction("email"));
    } else return dispatch(setAuthErrorAction(res.error || ""));
  };

  const confirmCodes = async () => {
    if (codePhone.length !== 4) {
      return dispatch(setAuthErrorAction("Введите код подтверждения SMS"));
    }
    if (codeEmail.length !== 4) {
      return dispatch(setAuthErrorAction("Введите код подтверждения Email"));
    }

    const resPhone = await apiAuthSignUpConfirmCode({
      type: "phone",
      value: cleanPhone(phone),
      code: codePhone,
    });
    const resEmail = await apiAuthSignUpConfirmCode({
      type: "email",
      value: email,
      code: codeEmail,
    });

    if (resPhone.status && resEmail.status) {
      dispatch(setAuthErrorAction(""));
      return dispatch(setAuthStageAction("personal data"));
    } else {
      return dispatch(
        setAuthErrorAction(resPhone.error || resEmail.error || "")
      );
    }

    // if (res.status) {
    //   dispatch(setAuthErrorAction(""));
    //   dispatch(setAuthStageAction("full name"));
    //   dispatch(setAuthConfirmationCodeSentAction(false));
    // } else {
    //   return dispatch(setAuthErrorAction(res.message || ""));
    // }
  };

  return (
    <>
      <p>Заполните данные для проверки:</p>

      <Input
        // className={error && name.length < 2 ? "input_error" : ""}
        placeholder="Введите имя*"
        value={name}
        onChange={(e) => dispatch(setAuthNameAction(e.target.value))}
      />
      <Input
        // className={error && surname.length < 2 ? "input_error" : ""}
        placeholder="Введите фамилию*"
        value={surname}
        onChange={(e) => {
          dispatch(setAuthSurnameAction(e.target.value));
        }}
      />
      <Input
        placeholder="Введите отчество"
        value={patronymic}
        onChange={(e) => {
          dispatch(setAuthPatronymicAction(e.target.value));
        }}
      />

      <Input
        type="phone"
        placeholder="Введите телефон*"
        value={phone}
        onChange={(e) => dispatch(setAuthPhoneAction(e.target.value))}
      />

      <Input
        placeholder="Введите почту*"
        value={email}
        onChange={(e) => dispatch(setAuthEmailAction(e.target.value))}
      />

      <Input
        type="number"
        placeholder="Введите ИНН*"
        value={inn}
        onChange={(e) => dispatch(setAuthInnAction(e.target.value))}
      />

      {confirmationCodeSent && (
        <>
          <Input
            type="number"
            placeholder="Введите код из SMS"
            value={codePhone}
            onChange={(e) => setCodePhone(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Введите код из письма"
            value={codeEmail}
            onChange={(e) => setCodeEmail(e.target.value)}
          />

          <button onClick={confirmCodes}>Подтвердить</button>
        </>
      )}

      <p>{error}</p>
      <button onClick={checkSignUpIdentificationData}>Дальше</button>
    </>
  );
};

export default AuthSignUpIdentificationData;
