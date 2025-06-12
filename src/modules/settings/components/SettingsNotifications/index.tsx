// import apiNotificationAdminGetAll from "@/api/notification/apiNotificationAdminGetAll.api";
import { FC, JSX, useEffect } from "react";

const SettingsNotifications: FC = (): JSX.Element => {
  
  const notificationGetAll = async () => {
    // const res = await apiNotificationAdminGetAll();
    // console.log(res)
  };

  useEffect(() => {
    notificationGetAll();
  }, []);
  return <>SettingsNotifications</>;
};

export default SettingsNotifications;
