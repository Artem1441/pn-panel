import ICity from "@/types/ICity.interface";
import ICityState from "@/types/ICityState.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICityState = {
  city: {
    name: "",
  },
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityAction: (state: ICityState, action: PayloadAction<ICity>): void => {
      state.city = action.payload;
    },
    setResetCityAction: (state: ICityState): void => {
      state.city = initialState.city;
    },
  },
});

export default citySlice.reducer;
