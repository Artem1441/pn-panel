import apiNotificationAdminGetAllCount from "@/api/notification/apiNotificationAdminGetAllCount.api";
import routes from "@/data/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX, useEffect } from "react";

const ArchiveAdmin: FC = (): JSX.Element => {
//   const router: NextRouter = useRouter();

//   const dispatch = useAppDispatch();
//   const { setTotalNotificationsAction } = notificationSlice.actions;

//   const { total_notifications } = useAppSelector(
//     (state) => state.notificationReducer
//   );

//   const notificationGetAllCount = async () => {
//     const res = await apiNotificationAdminGetAllCount();
//     if (!res.status) return 
//     dispatch(setTotalNotificationsAction(res.data || 0));
//   };

//   useEffect(() => {
//     notificationGetAllCount();
//   }, []);

  return (
    <>
      <h1>Архив админа:</h1>
      {/* <button onClick={() => router.push(routes.settings_information)}>
        Информация
      </button>
      <button onClick={() => router.push(routes.settings_notifications)}>
        Уведомления: {total_notifications}
      </button>
      <button onClick={() => router.push(routes.settings_specialtations)}>
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
      </button> */}
    </>
  );
};

export default ArchiveAdmin;
