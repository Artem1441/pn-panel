import { FC, JSX, memo, useEffect } from "react";
import apiSettingsGetSettingsPeriodicity from "@/api/settings/apiSettingsGetSettingsPeriodicity.api";
import apiSettingsGetSettingsTerminationReasons from "@/api/settings/apiSettingsGetSettingsTerminationReasons.api";
import apiSettingsUpdateSettingsPeriodicity from "@/api/settings/apiSettingsUpdateSettingsPeriodicity.api";
import Alert from "@/components/Alert";
import errors from "@/constants/errors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import { settingsSlice } from "@/store/reducers/settings.reducer";
import IPeriodicity from "@/types/IPeriodicity.interface";
import ISpeciality from "@/types/ISpeciality.interface";
import ITerminationReason from "@/types/ITerminationReason.interface";
import checkSettingsPeriodcity from "@/utils/checkSettingsPeriodcity";
import apiSettingsUpdateSettingsTerminationReasons from "@/api/settings/apiSettingsUpdateSettingsTerminationReasons.api";
import checkSettingsTerminationReasons from "@/utils/checkSettingsTerminationReasons";

const reporting_frequency_list: {
  label: string;
  value: IPeriodicity["reporting_frequency"];
}[] = [
  { label: "1 неделя", value: "1week" },
  { label: "2 недели", value: "2week" },
];

const reporting_day_of_week_list: {
  label: string;
  value: IPeriodicity["reporting_day_of_week"];
}[] = [
  { label: "Понедельник", value: "monday" },
  { label: "Вторник", value: "tuesday" },
  { label: "Среда", value: "wednesday" },
  { label: "Четверг", value: "thursday" },
  { label: "Пятница", value: "friday" },
  { label: "Суббота", value: "saturday" },
  { label: "Воскресенье", value: "sunday" },
];

const document_send_frequency_list: {
  label: string;
  value: IPeriodicity["document_send_frequency"];
}[] = [
  { label: "Ежедневно", value: "daily" },
  { label: "Еженедельно", value: "weekly" },
  { label: "Ежемесячно", value: "monthly" },
  { label: "Ежеквартально", value: "quarterly" },
  { label: "Раз в полгода", value: "semiannually" },
  { label: "Ежегодно", value: "annually" },
];

const TerminationReason: FC<{
  idx: number;
  terminationReason: {
    speciality: ISpeciality;
    terminationReasons: ITerminationReason[];
  };
}> = memo(({ idx, terminationReason }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setSettingTerminationReasonsAction } = settingsSlice.actions;
  const { terminationReasons } = useAppSelector(
    (state) => state.settingsReducer
  );

  const handleAdd = () => {
    let copyArr = JSON.parse(JSON.stringify(terminationReasons));
    copyArr[idx].terminationReasons.push({
      speciality_id: terminationReasons[idx].speciality.id,
      reason: "",
      description: "",
    });
    dispatch(setSettingTerminationReasonsAction(copyArr));
  };

  const handleChange = (
    j_idx: number,
    e: React.ChangeEvent<any>,
    field: "reason" | "description"
  ) => {
    const copyArr = JSON.parse(JSON.stringify(terminationReasons));
    copyArr[idx].terminationReasons[j_idx][field] = e.target.value;
    dispatch(setSettingTerminationReasonsAction(copyArr));
  };

  const handleDelete = (j_idx: number) => {
    const copyArr = JSON.parse(JSON.stringify(terminationReasons));
    copyArr[idx].terminationReasons.splice(j_idx, 1);
    dispatch(setSettingTerminationReasonsAction(copyArr));
  };

  return (
    <>
      <h1>С мастером {terminationReason.speciality.name}</h1>
      {terminationReasons[idx].terminationReasons.map(
        (terminationReason, j_idx) => (
          <div>
            <Input
              placeholder="Название"
              value={terminationReason.reason}
              onChange={(e) => handleChange(j_idx, e, "reason")}
            />
            <Input
              placeholder="Причина изменения"
              value={terminationReason.description}
              onChange={(e) => handleChange(j_idx, e, "description")}
            />
            <Button onClick={() => handleDelete(j_idx)}>Удалить</Button>
          </div>
        )
      )}
      <Button onClick={handleAdd}>Добавить</Button>
    </>
  );
});

const SettingsSettings: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setSettingPeriodicityAction, setSettingTerminationReasonsAction } =
    settingsSlice.actions;
  const { periodicity, terminationReasons } = useAppSelector(
    (state) => state.settingsReducer
  );

  const getSettingsPeriodicity = async () => {
    const res = await apiSettingsGetSettingsPeriodicity();
    if (res.status && res.data) dispatch(setSettingPeriodicityAction(res.data));
  };

  const getSettingsTerminationReasons = async () => {
    const res = await apiSettingsGetSettingsTerminationReasons();
    if (res.status && res.data)
      dispatch(setSettingTerminationReasonsAction(res.data));
  };

  const updateSettingsPeriodicity = async () => {
    const isValid = checkSettingsPeriodcity(periodicity);
    if (isValid.status) {
      try {
        const res = await apiSettingsUpdateSettingsPeriodicity({
          id: periodicity.id,
          reporting_frequency: periodicity.reporting_frequency,
          reporting_day_of_week: periodicity.reporting_day_of_week,
          document_send_frequency: periodicity.document_send_frequency,
          document_send_email: periodicity.document_send_email,
        });
        if (res.status) {
          Alert.show({
            title: "Изменение сохранено",
            icon: "success",
          });
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: res.error,
            icon: "error",
          });
        }
      } catch (err) {
        Alert.show({
          title: "Что-то пошлое не так",
          text: errors.network_error,
          icon: "error",
        });
      }
    } else {
      Alert.show({
        title: "Что-то пошлое не так",
        text: isValid.error,
        icon: "error",
      });
    }
  };

  const updateSettingsTerminationReasons = async () => {
    const isValid = checkSettingsTerminationReasons(terminationReasons);
    if (isValid.status) {
      try {
        const res = await apiSettingsUpdateSettingsTerminationReasons({
          terminationReasons
        });
        if (res.status) {
          Alert.show({
            title: "Изменение сохранено",
            icon: "success",
          });
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: res.error,
            icon: "error",
          });
        }
      } catch (err) {
        Alert.show({
          title: "Что-то пошлое не так",
          text: errors.network_error,
          icon: "error",
        });
      }
    } else {
      Alert.show({
        title: "Что-то пошлое не так",
        text: isValid.error,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getSettingsPeriodicity();
    getSettingsTerminationReasons();
  }, []);

  return (
    <>
      <div>
        <Input
          placeholder="Отчетный период"
          type="select"
          value={periodicity.reporting_frequency}
          onChange={(e) =>
            dispatch(
              setSettingPeriodicityAction({
                ...periodicity,
                reporting_frequency: e.target
                  .value as IPeriodicity["reporting_frequency"],
              })
            )
          }
          options={reporting_frequency_list.map((frequency) => ({
            label: frequency.label,
            value: frequency.value,
          }))}
        />

        <Input
          placeholder="День формирования отчета"
          type="select"
          value={periodicity.reporting_day_of_week}
          onChange={(e) =>
            dispatch(
              setSettingPeriodicityAction({
                ...periodicity,
                reporting_day_of_week: e.target
                  .value as IPeriodicity["reporting_day_of_week"],
              })
            )
          }
          options={reporting_day_of_week_list.map((day) => ({
            label: day.label,
            value: day.value,
          }))}
        />

        <Input
          placeholder="Период автоматической отправки документов"
          type="select"
          value={periodicity.document_send_frequency}
          onChange={(e) =>
            dispatch(
              setSettingPeriodicityAction({
                ...periodicity,
                document_send_frequency: e.target
                  .value as IPeriodicity["document_send_frequency"],
              })
            )
          }
          options={document_send_frequency_list.map((frequency) => ({
            label: frequency.label,
            value: frequency.value,
          }))}
        />

        <Input
          placeholder="Отправка на почту:"
          value={periodicity.document_send_email}
          onChange={(e) =>
            dispatch(
              setSettingPeriodicityAction({
                ...periodicity,
                document_send_email: e.target.value,
              })
            )
          }
        />

        <Button onClick={updateSettingsPeriodicity}>Сохранить данные</Button>
      </div>

      <div>
        <h1>Список причин для расторжения договоров:</h1>
        {terminationReasons.map((terminationReason, i) => (
          <TerminationReason terminationReason={terminationReason} idx={i} />
        ))}

        <div>
          <Button onClick={updateSettingsTerminationReasons}>
            Сохранить данные
          </Button>
        </div>
      </div>
    </>
  );
});

export default SettingsSettings;
