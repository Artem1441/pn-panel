import { FC, JSX, memo, useEffect } from "react";
import Alert from "@/components/Alert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import errors from "@/constants/errors";
import { motivationSlice } from "@/store/reducers/motivation.reducer";
import apiMotivationGetMotivation from "@/api/motivation/apiMotivationGetMotivation.api";
import checkMotivation from "@/utils/checkMotivation";
import apiMotivationUpdateMotivation from "@/api/motivation/apiMotivationUpdateMotivation.api";
import IMotivation, {
  ArrayMotivationDataFieldKey,
  IMotivationDataItem,
} from "@/types/IMotivation.interface";

const MotivationTable: FC<{
  title: string;
  motivation: IMotivation;
  items: IMotivationDataItem[];
  fieldKey: ArrayMotivationDataFieldKey;
  updateField: <K extends ArrayMotivationDataFieldKey>(
    key: K,
    data: IMotivation[K]
  ) => void;
}> = ({ title, motivation, items, fieldKey, updateField }): JSX.Element => {
  const handleChange = (idx: number, field: string, value: string) => {
    const list = [...motivation[fieldKey]];
    list[idx] = { ...list[idx], [field]: value };
    updateField(fieldKey, list);
  };

  const handleDelete = (idx: number) => {
    const list = motivation[fieldKey].filter((_, i) => i !== idx);
    updateField(fieldKey, list);
  };

  const handleAdd = () => {
    const newItem: IMotivationDataItem = {
      name: "",
      condition: "",
      price: "",
    };

    const updatedList = [...items, newItem];
    updateField(fieldKey, updatedList);
  };

  return (
    <div>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>наименование</th>
            <th>условие</th>
            <th>размер</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <Input
                  placeholder="Мотивация"
                  value={item.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                />
              </td>
              <td>
                <Input
                  placeholder="Условие"
                  value={item.condition}
                  onChange={(e) => handleChange(i, "condition", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Цена (руб)"
                  value={item.price}
                  onChange={(e) => handleChange(i, "price", e.target.value)}
                />
              </td>
              <td>
                <Button onClick={() => handleDelete(i)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={handleAdd}>Добавить</Button>
    </div>
  );
};

const SettingsMotivation: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setMotivationAction } = motivationSlice.actions;
  const { motivation } = useAppSelector((state) => state.motivationReducer);

  const getMotivation = async () => {
    const res = await apiMotivationGetMotivation();
    if (res.status && res.data) dispatch(setMotivationAction(res.data));
  };

  const updateMotivation = async () => {
    const isValid = checkMotivation(motivation);
    if (isValid.status) {
      try {
        const res = await apiMotivationUpdateMotivation({
          id: motivation.id,
          allowance_data: motivation.allowance_data,
          deduction_data: motivation.deduction_data,
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

  const updateMotivationField = <K extends keyof IMotivation>(
    field: K,
    data: IMotivation[K]
  ) => {
    dispatch(
      setMotivationAction({
        ...motivation,
        [field]: data,
      })
    );
  };

  useEffect(() => {
    getMotivation();
  }, []);

  return (
    <>
      <MotivationTable
        title="список надбавок"
        items={motivation.allowance_data}
        motivation={motivation}
        fieldKey="allowance_data"
        updateField={updateMotivationField}
      />

      <MotivationTable
        title="список удержаний"
        items={motivation.deduction_data}
        motivation={motivation}
        fieldKey="deduction_data"
        updateField={updateMotivationField}
      />

      <Button onClick={updateMotivation}>Сохранить данные</Button>
    </>
  );
});

export default SettingsMotivation;
