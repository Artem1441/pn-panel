import IPeriodicity from "@/types/IPeriodicity.interface";
import ISettingsState from "@/types/ISettingsState.interface";
import ISpeciality from "@/types/ISpeciality.interface";
import ITerminationReason from "@/types/ITerminationReason.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISettingsState = {
  periodicity: {
    reporting_frequency: "2week",
    reporting_day_of_week: "sunday",
    document_send_frequency: "monthly",
    document_send_email: "",
  },
  terminationReasons: []
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingPeriodicityAction: (
      state: ISettingsState,
      action: PayloadAction<IPeriodicity>
    ): void => {
      state.periodicity = action.payload;
    },

    setSettingTerminationReasonsAction: (
      state: ISettingsState,
      action: PayloadAction<{ speciality: ISpeciality; terminationReasons: ITerminationReason[] }[]>
    ): void => {
      state.terminationReasons = action.payload;
    },

    // setResetPriceAction: (state: IPriceState): void => {
    //   state.price = initialState.price;
    // },
  },
});

export default settingsSlice.reducer;
