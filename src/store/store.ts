import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import notificationReducer from "./reducers/notification.reducer";
import informationReducer from "./reducers/information.reducer";
import studioReducer from "./reducers/studio.reducer";
import cityReducer from "./reducers/city.reducer";
import specialityReducer from "./reducers/speciality.reducer";
import priceReducer from "./reducers/price.reducer";
import generalReducer from "./reducers/general.reducer";
import motivationReducer from "./reducers/motivation.reducer";

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  informationReducer,
  studioReducer,
  cityReducer,
  priceReducer,
  motivationReducer,
  specialityReducer,
  generalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
