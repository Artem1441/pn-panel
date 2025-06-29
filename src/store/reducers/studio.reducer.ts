import IStudio, { IStudioState } from "@/types/IStudio.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IStudioState = {
  studio: {
    name: "",

    general_full_address: "",
    general_area: "",
    general_cadastral_number: "",
    general_contract_number: "",
    general_contract_date: "",
    general_registration: "",
    general_rent_price_per_sqm: "",

    general_owner_last_name: "",
    general_owner_first_name: "",
    general_owner_middle_name: "",
    general_owner_phone: "",
    general_owner_email: "",

    general_coowner_available: false,
    general_coowner_last_name: "",
    general_coowner_first_name: "",
    general_coowner_middle_name: "",
    general_coowner_phone: "",
    general_coowner_email: "",

    general_work_schedule: "",
    general_work_schedule_weekdays: "",
    general_work_schedule_weekends: "",
    general_wifi_password: "",
    general_alarm_code: "",
    general_lock_code: "",

    general_services_mani: "",
    general_services_pedi: "",
    general_services_brows: "",

    general_sublease_available: false,
    general_sublease_area: "",
    general_sublease_activity_type: "",
    general_sublease_contact_last_name: "",
    general_sublease_contact_first_name: "",
    general_sublease_contact_middle_name: "",
    general_sublease_contact_phone: "",
    general_sublease_contact_email: "",
    general_sublease_rent_price_per_sqm: "",
  },
};

export const studioSlice = createSlice({
  name: "studio",
  initialState,
  reducers: {
    setStudioAction: (
      state: IStudioState,
      action: PayloadAction<IStudio>
    ): void => {
      state.studio = action.payload;
    },

    setResetStudioAction: (state: IStudioState): void => {
      state.studio = initialState.studio;
    },
  },
});

export default studioSlice.reducer;
