import routes from "@/data/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { NextRouter, useRouter } from "next/router";
import { FC, JSX } from "react";

const HomeSpecialist: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <button onClick={() => router.push(routes.clients)}>Клиенты</button>
      </div>
      <div>
        <button onClick={() => router.push(routes.payments)}>Платежи</button>
      </div>
      <div>
        <button onClick={() => router.push(routes.docs)}>Документы</button>
      </div>
      <div>
        <button onClick={() => router.push(routes.personal)}>
          Персональный кабинет
        </button>
      </div>
    </>
  );
};

export default HomeSpecialist;
