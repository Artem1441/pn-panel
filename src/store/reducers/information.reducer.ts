import IInformation from "@/types/IInformation.interface";
import IInformationChange from "@/types/IInformationChange.interface";
import IInformationState from "@/types/IInformationState.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IInformationState = {
  information: {
    general_role: "director",
    full_name: "",
    short_name: "",
    inn: "",
    ogrn: "",
    kpp: "",
    okved: "",
    director_fio: "",
    director_position: "",
    director_basis: "",
    authorized_person_fio: "",
    authorized_person_position: "",
    authorized_person_basis: "",
    legal_address: "",
    correspondence_address: "",
    contact_phone: "",
    accounting_phone: "",
    email: "",
    website: "",
    bank_acc: "",
    bank_bik: "",
    bank_cor: "",
    bank_name: "",
    company_card: "",
    inn_file: "",
    ustat: "",
    stamp: "",
    power_of_attorney: "",
    director_signature: "",
    authorized_person_signature: "",
  },
  information_changes: [],
};

export const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    setInformationAction: (
      state: IInformationState,
      action: PayloadAction<IInformation>
    ): void => {
      state.information = action.payload;
    },
    setInformationChangesAction: (
        state: IInformationState,
        action: PayloadAction<IInformationChange[]>
      ): void => {
        state.information_changes = action.payload;
      },
  },
});

export default informationSlice.reducer;
