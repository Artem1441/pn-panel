import Unauthorized from "@/components/Unauthorized";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, JSX } from "react";
import AdminAdmin from "../AdminAdmin";

const Admin: FC = (): JSX.Element => {
  const { role } = useAppSelector((state) => state.generalReducer);
  return (
    <>
      {role === "admin" ? (
        <AdminAdmin />
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

export default Admin;
