import {
  apiAuthSignUpConfirmCode,
  apiAuthSignUpCreateUser,
} from "@/api/auth.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Input from "@/shared/Input";
import { authSlice } from "@/store/reducers/auth.reducer";
import checkIdentificationData from "@/utils/checkIdentificationData";
import cleanPhone from "@/utils/cleanPhone";
import { useState } from "react";

const AuthSignUpPersonalData = () => {
  const dispatch = useAppDispatch();
  const {
    setAuthPassportSeriesAction,
    setAuthPassportNumberAction,
    setAuthIssueDateAction,
    setAuthIssuedByAction,
    setAuthBirthdateAction,
    setAuthNationalityAction,
    setAuthRegistrationAddressAction,
    setAuthResidentialAddressAction,
    setAuthBankAccAction,
    setAuthBankBikAction,
    setAuthErrorAction,
  } = authSlice.actions;

  const { passport, bank_acc, bank_bik, error } = useAppSelector(
    (state) => state.authReducer
  );

  return (
    <>
      <p>Укажите паспортные данные</p>
      <Input
        // className={error && name.length < 2 ? "input_error" : ""}
        placeholder="Номер"
        value={passport.passport_number}
        onChange={(e) => dispatch(setAuthPassportNumberAction(e.target.value))}
      />
      <Input
        // className={error && surname.length < 2 ? "input_error" : ""}
        placeholder="Серия"
        value={passport.passport_series}
        onChange={(e) => {
          dispatch(setAuthPassportSeriesAction(e.target.value));
        }}
      />
      <Input
        placeholder="Когда выдан"
        value={passport.issue_date}
        onChange={(e) => {
          dispatch(setAuthIssueDateAction(e.target.value));
        }}
      />

      <Input
        placeholder="Кем выдан"
        value={passport.issued_by}
        onChange={(e) => {
          dispatch(setAuthIssuedByAction(e.target.value));
        }}
      />

      <Input
        placeholder="Дата рождения"
        value={passport.birthdate}
        onChange={(e) => {
          dispatch(setAuthBirthdateAction(e.target.value));
        }}
      />

      <Input
        placeholder="Гражданство"
        value={passport.nationality}
        onChange={(e) => {
          dispatch(setAuthNationalityAction(e.target.value));
        }}
      />

      <Input
        placeholder="Адрес регистрации"
        value={passport.registration_address}
        onChange={(e) => {
          dispatch(setAuthRegistrationAddressAction(e.target.value));
        }}
      />

      <Input
        placeholder="Фактический адрес проживания"
        value={passport.residential_address}
        onChange={(e) => {
          dispatch(setAuthResidentialAddressAction(e.target.value));
        }}
      />

      <p>Укажите паспортные данные</p>
      <Input
        placeholder="БИК"
        value={bank_bik}
        onChange={(e) => {
          dispatch(setAuthBankBikAction(e.target.value));
        }}
      />

      <Input
        placeholder="Название банка"
        value={passport.residential_address}
        onChange={(e) => {
          dispatch(setAuthBankAccAction(e.target.value));
        }}
      />

      <p>{error}</p>
      <button onClick={() => {}}>Дальше</button>
    </>
  );
};

export default AuthSignUpPersonalData;
