import ISpeciality, { ISpecialityState } from "@/types/ISpeciality.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISpecialityState = {
  speciality: {
    name: "",
  },
};

export const specialitySlice = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    setSpecialityAction: (state: ISpecialityState, action: PayloadAction<ISpeciality>): void => {
      state.speciality = action.payload;
    },
    setResetSpecialityAction: (state: ISpecialityState): void => {
      state.speciality = initialState.speciality;
    },
  },
});

export default specialitySlice.reducer;
