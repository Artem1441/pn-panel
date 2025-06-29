import IMotivation from "@/types/IMotivation.interface";
import IMotivationState from "@/types/IMotivationState.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMotivationState = {
  motivation: {
    allowance_data: [],
    deduction_data: [],
  },
};

export const motivationSlice = createSlice({
  name: "motivation",
  initialState,
  reducers: {
    setMotivationAction: (
      state: IMotivationState,
      action: PayloadAction<IMotivation>
    ): void => {
      state.motivation = action.payload;
    },
  },
});

export default motivationSlice.reducer;
