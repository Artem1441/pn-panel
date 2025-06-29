import apiNotificationAdminGetAll from "@/api/notification/apiNotificationAdminGetAll.api";
import apiNotificationAdminGetAllCount from "@/api/notification/apiNotificationAdminGetAllCount.api";
import routes from "@/data/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX, useEffect } from "react";

const AdminAdmin: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();

  const dispatch = useAppDispatch();
  const { setAdminNotificationsCountAction } = notificationSlice.actions;

  const { admin_notifications_count } = useAppSelector(
    (state) => state.notificationReducer
  );

  const notificationAdminGetAllCount = async () => {
    const res = await apiNotificationAdminGetAllCount();
    if (!res.status) return;
    dispatch(setAdminNotificationsCountAction(res.data || 0));
  };

  useEffect(() => {
    notificationAdminGetAllCount();
  }, []);

  return (
    <>
      <h1>Администрирование админа:</h1>

      <button onClick={() => router.push(routes.admin_notifications)}>
        Уведомления: {admin_notifications_count}
      </button>
      {/* 
      <button onClick={() => router.push(routes.settings_notifications)}>
        Уведомления: {total_notifications}
      </button>
      <button onClick={() => router.push(routes.settings_specialities)}>
        Специализации
      </button>
      <button onClick={() => router.push(routes.settings_studios)}>
        Студии
      </button>
      <button onClick={() => router.push(routes.settings_complectations)}>
        Комплектация
      </button>
      <button onClick={() => router.push(routes.settings_motivation)}>
        Мотивации
      </button>
      <button onClick={() => router.push(routes.settings_docs)}>
        Документы
      </button>
      <button onClick={() => router.push(routes.settings_settings)}>
        Настройки
      </button> 
      */}
    </>
  );
};

export default AdminAdmin;
