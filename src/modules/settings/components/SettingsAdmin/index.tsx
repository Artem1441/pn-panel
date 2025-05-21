import routes from "@/data/routes";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX } from "react";

const SettingsAdmin: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();

  return (
    <>
      <h1>Настройки админа:</h1>
      <button onClick={() => router.push(routes.settings_information)}>
        Информация
      </button>
      <button onClick={() => router.push(routes.settings_notifications)}>
        Уведомления
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
      </button>
    </>
  );
};

export default SettingsAdmin;
