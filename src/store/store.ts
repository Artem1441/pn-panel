import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import generalReducer from "./reducers/general.reducer";

const rootReducer = combineReducers({
  authReducer,
  generalReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
