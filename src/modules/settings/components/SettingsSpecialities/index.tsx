import { FC, JSX, memo, useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import errors from "@/constants/errors";
import ISpeciality from "@/types/ISpeciality.interface";
import apiSpecialityUpdateSpeciality from "@/api/speciality/apiSpecialityUpdateSpeciality.api";
import checkSpeciality from "@/utils/checkSpeciality";
import apiSpecialityDeleteSpeciality from "@/api/speciality/apiSpecialityDeleteSpeciality.api";
import { specialitySlice } from "@/store/reducers/speciality.reducer";
import apiSpecialityGetSpecialities from "@/api/speciality/apiSpecialityGetSpecialities.api";
import apiSpecialityCreateSpeciality from "@/api/speciality/apiSpecialityCreateSpeciality.api";

const Speciality: FC<{ data: ISpeciality; getSpeciality: () => void }> = memo(
  ({ data, getSpeciality }): JSX.Element => {
    const [speciality, setSpeciality] = useState<ISpeciality>(data);

    const updateSpeciality = async () => {
      const isValid = checkSpeciality(speciality);
      if (isValid.status) {
        try {
          const res = await apiSpecialityUpdateSpeciality({
            id: speciality.id,
            name: speciality.name,
          });
  
          if (!res.status) {
            Alert.show({
              title: "Что-то пошлое не так",
              text: res.error,
              icon: "error",
            });
          }
        } catch (err) {
          console.log(err);
          Alert.show({
            title: "Что-то пошлое не так",
            text: JSON.stringify(err),
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

    const deleteSpeciality = async () => {
      try {
        const res = await apiSpecialityDeleteSpeciality({ id: data.id });
  
        console.log(res);
        if (res.status) {
          getSpeciality();
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: res.error,
            icon: "error",
          });
        }
      } catch (err) {
        console.log(err);
        Alert.show({
          title: "Что-то пошлое не так",
          text: errors.network_error,
          icon: "error",
        });
      }
    };

    return (
      <>
        <div>
          <Input
            placeholder="Название специальности"
            value={speciality.name}
            onChange={(e) => setSpeciality({ ...speciality, name: e.target.value })}
          />
        </div>

        <div>
          <Button onClick={updateSpeciality}>Обновить специальность</Button>
          <Button onClick={deleteSpeciality}>Удалить специальность</Button>
        </div>
      </>
    );
  }
);

const SettingsSpecialities: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setSpecialityAction, setResetSpecialityAction } = specialitySlice.actions;
  const { speciality } = useAppSelector((state) => state.specialityReducer);
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);

  useEffect(() => {
    getSpecialities();
  }, []);

  const getSpecialities = async () => {
    const res = await apiSpecialityGetSpecialities();
    if (res.status && res.data) setSpecialities(res.data);
  };

  const createSpeciality = async () => {
    const isValid = checkSpeciality(speciality);
    if (isValid.status) {
      try {
        const res = await apiSpecialityCreateSpeciality({
          name: speciality.name,
        });

        if (res.status) {
          getSpecialities();
          dispatch(setResetSpecialityAction());
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
          text: isValid.error,
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

  return (
    <>
      <div>
        <Input
          placeholder="Название специальности"
          value={speciality.name}
          onChange={(e) =>
            dispatch(setSpecialityAction({ ...speciality, name: e.target.value }))
          }
        />

        <Button onClick={createSpeciality}>Создать специальность</Button>

        {specialities.map((speciality) => (
          <Speciality key={speciality.id} data={speciality} getSpeciality={getSpecialities} />
        ))}
      </div>
    </>
  );
});

export default SettingsSpecialities;
