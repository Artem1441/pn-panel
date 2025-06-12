import Unauthorized from "@/components/Unauthorized";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, JSX } from "react";
import SettingsAccountant from "../SettingsAccountant";
import SettingsAdmin from "../SettingsAdmin";
import SettingsSpecialist from "../SettingsSpecialist";

const Settings: FC = (): JSX.Element => {
  const { role } = useAppSelector((state) => state.generalReducer);
  return (
    <>
      {role === "admin" ? (
        <SettingsAdmin />
      ) : role === "accountant" ? (
        <SettingsAccountant />
      ) : role === "specialist" ? (
        <SettingsSpecialist />
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Settings;
