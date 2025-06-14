import IUser from "./IUser.interface";
export default interface INotificationState {
  total_notifications: {
    admin: number;
    archive: number;
    settings: number;
  };
  admin_notifications_count: number;
  archive_notifications_count: number;
  settings_notifications_count: number;
  admin_notifications: {
    usersInWaitingRoom: IUser[];
  };
  archive_notifications: {};
  settings_notifications: {};
}
