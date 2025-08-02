import apiNotificationGetAllCounts from "@/api/notification/apiNotificationGetAllCounts.api";
import routes from "@/data/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX, useEffect } from "react";

const HomeAdmin: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const { setTotalNotificationsAction } = notificationSlice.actions;

  const { total_notifications } = useAppSelector(
    (state) => state.notificationReducer
  );

  const notificationAdminGetAllCount = async () => {
    const res = await apiNotificationGetAllCounts();
    if (!res.status) return;
    dispatch(
      setTotalNotificationsAction(
        res.data || { admin: 0, archive: 0, settings: 0 }
      )
    );
  };

  useEffect(() => {
    notificationAdminGetAllCount();
  }, []);

  return (
    <>
      <div>
        <button onClick={() => router.push(routes.admin)}>
          Администрирование{" "}
          {total_notifications.admin !== 0 && total_notifications.admin}
        </button>
      </div>
      <div>
        <button onClick={() => router.push(routes.settings)}>
          Настройки{" "}
          {total_notifications.settings !== 0 && total_notifications.settings}
        </button>
      </div>
      <div>
        <button onClick={() => router.push(routes.archive)}>
          Архив{" "}
          {total_notifications.archive !== 0 && total_notifications.archive}
        </button>
      </div>
    </>
  );
};

export default HomeAdmin;
