import IPrice from "@/types/IPrice.interface";
import IPriceState from "@/types/IPriceState.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IPriceState = {
  price: {
    self_employed_data: [],
    clients_mani_data: [],
    clients_pedi_data: [],
    clients_mani_pedi_four_hands_data: [],
    clients_design_data: [],
    clients_additional_nail_services_data: [],
    clients_brow_arch_data: [],
    clients_promo_data: [],
    clients_model_data: [],
    clients_goods_data: [],
  },
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPriceAction: (
      state: IPriceState,
      action: PayloadAction<IPrice>
    ): void => {
      state.price = action.payload;
    },

    setResetPriceAction: (state: IPriceState): void => {
      state.price = initialState.price;
    },
  },
});

export default priceSlice.reducer;
