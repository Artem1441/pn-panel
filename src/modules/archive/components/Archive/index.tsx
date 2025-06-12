import Unauthorized from "@/components/Unauthorized";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, JSX } from "react";
import ArchiveAdmin from "../ArchiveAdmin";

const Archive: FC = (): JSX.Element => {
  const { role } = useAppSelector((state) => state.generalReducer);
  return (
    <>
      {role === "admin" ? (
        <ArchiveAdmin />
      ) : role === "accountant" ? (
        <></>
      ) : role === "specialist" ? (
        <></>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Archive;
