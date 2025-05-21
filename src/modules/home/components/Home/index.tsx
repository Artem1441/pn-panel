import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, JSX } from "react";
import HomeAccountant from "../HomeAccountant";
import HomeAdmin from "../HomeAdmin";
import HomeSpecialist from "../HomeSpecialist";
import HomeUnauthorized from "../HomeUnauthorized";

const Home: FC = (): JSX.Element => {
  const { role } = useAppSelector((state) => state.generalReducer);
  return (
    <>
      {role === "admin" ? (
        <HomeAdmin />
      ) : role === "accountant" ? (
        <HomeAccountant />
      ) : role === "specialist" ? (
        <HomeSpecialist />
      ) : (
        <HomeUnauthorized />
      )}
    </>
  );
};

export default Home;
