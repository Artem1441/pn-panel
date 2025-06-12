import INotificationState from "@/types/INotificationState.interface";
import IUser from "@/types/IUser.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: INotificationState = {
  total_notifications: {
    admin: 0,
    archive: 0,
    settings: 0,
  },
  admin_notifications_count: 0,
  archive_notifications_count: 0,
  settings_notifications_count: 0,
  admin_notifications: {
    usersInWaitingRoom: []
  },
  archive_notifications: {},
  settings_notifications: {}
};

export const notificationSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTotalNotificationsAction: (
      state: INotificationState,
      action: PayloadAction<{
        admin: number;
        archive: number;
        settings: number;
      }>
    ): void => {
      state.total_notifications = action.payload;
    },
    setAdminNotificationsAction: (
      state: INotificationState,
      action: PayloadAction<{
        usersInWaitingRoom: IUser[];
      }>
    ): void => {
      state.admin_notifications = action.payload;
    },
    setArchiveNotificationsAction: (
      state: INotificationState,
      action: PayloadAction<{}>
    ): void => {
      state.archive_notifications = action.payload;
    },
    setSettingsNotificationsAction: (
      state: INotificationState,
      action: PayloadAction<{}>
    ): void => {
      state.settings_notifications = action.payload;
    },
    setAdminNotificationsCountAction: (
      state: INotificationState,
      action: PayloadAction<number>
    ): void => {
      state.admin_notifications_count = action.payload;
    },
    setArchiveNotificationsCountAction: (
      state: INotificationState,
      action: PayloadAction<number>
    ): void => {
      state.archive_notifications_count = action.payload;
    },
    setSettingsNotificationsCountAction: (
      state: INotificationState,
      action: PayloadAction<number>
    ): void => {
      state.settings_notifications_count = action.payload;
    },
  },
});

export default notificationSlice.reducer;
