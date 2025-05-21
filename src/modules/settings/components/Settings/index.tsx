import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, JSX } from "react";
import SettingsAccountant from "../SettingsAccountant";
import SettingsAdmin from "../SettingsAdmin";
import SettingsSpecialist from "../SettingsSpecialist";
import SettingsUnauthorized from "../SettingsUnauthorized";

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
        <SettingsUnauthorized />
      )}
    </>
  );
};

export default Settings;
