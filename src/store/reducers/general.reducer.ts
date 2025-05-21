import IGeneralState from "@/types/IGeneralState.interface";
import RoleType from "@/types/RoleType.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IGeneralState = {
  role: "unauthorized",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setGeneralRoleAction: (
      state: IGeneralState,
      action: PayloadAction<RoleType>
    ): void => {
      state.role = action.payload;
    },
  },
});

export default generalSlice.reducer;
