import apiNotificationAdminGetAll from "@/api/notification/apiNotificationAdminGetAll.api";
import Alert  from "@/components/Alert";
import UserInWaitingRoom from "@/components/UserInWaitingRoom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import { FC, JSX, useEffect } from "react";

const AdminNotifications: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setAdminNotificationsAction } = notificationSlice.actions;

  const { admin_notifications } = useAppSelector(
    (state) => state.notificationReducer
  );

  const notificationAdminGetAll = async () => {
    const res = await apiNotificationAdminGetAll();
    if (!res.status)
      return Alert.show({
        title: "Что-то не так",
        icon: "error",
      });
    dispatch(
      setAdminNotificationsAction(res.data || { usersInWaitingRoom: [] })
    );
  };

  useEffect(() => {
    notificationAdminGetAll();
  }, []);

  return (
    <>
      <h1>Новые мастера на проверку:</h1>

      {admin_notifications.usersInWaitingRoom.map((user) => (
        <UserInWaitingRoom user={user} />
      ))}
    </>
  );
};

export default AdminNotifications;
