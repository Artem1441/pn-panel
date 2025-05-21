import routes from "@/data/routes";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX } from "react";

const HomeAdmin: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();

  return (
    <>
      <div>
        <button>Адимнистрирование</button>
      </div>
      <div>
        <button onClick={() => router.push(routes.settings)}>Настройки</button>
      </div>
      <div>
        <button>Архив</button>
      </div>
    </>
  );
};

export default HomeAdmin;
