// import roles from "@/constants/roles";
import IAuthState from "@/types/IAuthState.interface";
import StageType from "@/types/StageType.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  stage: "accession agreement",
  name: "",
  surname: "",
  patronymic: "",
  inn: "",
  confirmationCodeSent: false,
  phone: "",
  email: "",
  passport: {
    passport_number: "",
    passport_series: "",
    issue_date: "",
    issued_by: "",
    birthdate: "",
    nationality: "",
    registration_address: "",
    residential_address: "",
  },
  bank_bik: "",
  bank_acc: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStageAction: (
      state: IAuthState,
      action: PayloadAction<StageType>
    ) => {
      state.stage = action.payload;
    },
    setAuthNameAction: (state: IAuthState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAuthSurnameAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.surname = action.payload;
    },
    setAuthPatronymicAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.patronymic = action.payload;
    },
    setAuthPhoneAction: (state: IAuthState, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAuthEmailAction: (state: IAuthState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAuthInnAction: (state: IAuthState, action: PayloadAction<string>) => {
      state.inn = action.payload;
    },
    setAuthConfirmationCodeSentAction: (
      state: IAuthState,
      action: PayloadAction<boolean>
    ) => {
      state.confirmationCodeSent = action.payload;
    },
    setAuthPassportNumberAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.passport_number = action.payload;
    },
    setAuthPassportSeriesAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.passport_series = action.payload;
    },
    setAuthIssueDateAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.issue_date = action.payload;
    },
    setAuthIssuedByAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.issued_by = action.payload;
    },
    setAuthBirthdateAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.birthdate = action.payload;
    },
    setAuthNationalityAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.nationality = action.payload;
    },
    setAuthRegistrationAddressAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.registration_address = action.payload;
    },
    setAuthResidentialAddressAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.passport.residential_address = action.payload;
    },

    setAuthBankAccAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.bank_acc = action.payload;
    },
    setAuthBankBikAction: (
      state: IAuthState,
      action: PayloadAction<string>
    ) => {
      state.bank_bik = action.payload;
    },
    setAuthErrorAction: (state: IAuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // setUserIdAction: (
    //   state: IAuthState,
    //   action: PayloadAction<number | string>
    // ) => {
    //   state.user_id = Number(action.payload);
    // },
    // setRoleAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.role = action.payload;
    // },
    // setNameAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.name = action.payload;
    // },
    // setSurnameAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.surname = action.payload;
    // },
    // setSpecialityAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.speciality = action.payload;
    // },
    // setEmailAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.email = action.payload;
    // },
    // setPasswordAction: (state: IAuthState, action: PayloadAction<string>) => {
    //   state.password = action.payload;
    // },

    // resetRegistrationAction: (state: IAuthState) => {
    //   state.email = "";
    //   state.password = "";
    //   state.error = "";
    // },
    // logoutAction: (state: IAuthState) => {
    //   state.token = "";
    //   state.role = roles.student;
    //   state.name = "";
    //   state.surname = "";
    //   state.speciality = "";
    //   state.email = "";
    //   state.password = "";
    // },
  },
});

export default authSlice.reducer;
