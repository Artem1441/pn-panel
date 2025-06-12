import { FC, JSX, memo, useEffect, useState } from "react";
import apiInformationGetInformation from "@/api/information/apiInformationGetInformation.api";
import apiInformationGetInformationChanges from "@/api/information/apiInformationGetInformationChanges.api";
import apiInformationUpdateInformation from "@/api/information/apiInformationUpdateInformation.api";
import Alert  from "@/components/Alert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Image from "@/shared/Image";
import Input from "@/shared/Input";
import { informationSlice } from "@/store/reducers/information.reducer";
import IInformationChange from "@/types/IInformationChange.interface";
import getImageUrl from "@/utils/getImageUrl";
import checkInformation from "@/utils/checkInformation";
import errors from "@/constants/errors";

const InformationChange = memo(({ data }: { data: IInformationChange }) => {
  return (
    <div>
      <p>
        Сменил: {data.changed_by_fio},{" "}
        {data.changed_by_role === "director"
          ? "Директор"
          : "Исполняющий обязанности"}
      </p>
      <p>
        Изменилось поле "{data.changed_field}" с "{data.old_value}" на "
        {data.new_value}"
      </p>
    </div>
  );
});

const SettingsInformation: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setInformationAction, setInformationChangesAction } =
    informationSlice.actions;
  const { information, information_changes } = useAppSelector(
    (state) => state.informationReducer
  );
  const [isOpenInformationChanges, setIsOpenInformationChanges] =
    useState<boolean>(false);

  const getInformation = async () => {
    const res = await apiInformationGetInformation();
    if (res.status && res.data) dispatch(setInformationAction(res.data));
  };

  const getInformationChanges = async () => {
    const res = await apiInformationGetInformationChanges();
    if (res.status && res.data) dispatch(setInformationChangesAction(res.data));
  };

  const updateInformation = async () => {
    const isValid = checkInformation(information);
    if (isValid.status) {
      try {
        const res = await apiInformationUpdateInformation(information);
        await getInformationChanges();
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

  const openInformationChanges = async () => {
    if (!isOpenInformationChanges) await getInformationChanges();
    setIsOpenInformationChanges((prev) => !prev);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <>
      <Input
        placeholder="Полное наименование"
        value={information.full_name}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, full_name: e.target.value })
          )
        }
      />
      <Input
        placeholder="Краткое наименование"
        value={information.short_name}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, short_name: e.target.value })
          )
        }
      />
      <Input
        type="number"
        placeholder="ИНН"
        value={information.inn}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, inn: e.target.value })
          )
        }
      />
      <Input
        type="number"
        placeholder="ОГРН"
        value={information.ogrn}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, ogrn: e.target.value })
          )
        }
      />
      <Input
        type="number"
        placeholder="КПП"
        value={information.kpp}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, kpp: e.target.value })
          )
        }
      />
      <Input
        type="number"
        placeholder="ОКВЭД"
        value={information.okved}
        onChange={(e) =>
          dispatch(
            setInformationAction({ ...information, okved: e.target.value })
          )
        }
      />
      <Input
        placeholder="ФИО руководителя"
        value={information.director_fio}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              director_fio: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Должность"
        value={information.director_position}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              director_position: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="На основании"
        value={information.director_basis}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              director_basis: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="ФИО исполняющего обязанности"
        value={information.authorized_person_fio}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              authorized_person_fio: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Должность"
        value={information.authorized_person_position}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              authorized_person_position: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="На основании"
        value={information.authorized_person_basis}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              authorized_person_basis: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Юридический адрес"
        value={information.legal_address}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              legal_address: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Адрес для корреспонденции"
        value={information.correspondence_address}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              correspondence_address: e.target.value,
            })
          )
        }
      />
      <Input
        type="phone"
        placeholder="Контактный телефон"
        value={information.contact_phone}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              contact_phone: e.target.value,
            })
          )
        }
      />
      <Input
        type="phone"
        placeholder="Телефон бухгалтерии"
        value={information.accounting_phone}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              accounting_phone: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Email"
        value={information.email}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              email: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Адрес в интернете"
        value={information.website}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              website: e.target.value,
            })
          )
        }
      />
      <Input
        type="number"
        placeholder="Расчетный счёт"
        value={information.bank_acc}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              bank_acc: e.target.value,
            })
          )
        }
      />
      <Input
        type="number"
        placeholder="БИК"
        value={information.bank_bik}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              bank_bik: e.target.value,
            })
          )
        }
      />
      <Input
        type="number"
        placeholder="Корреспондентский счёт"
        value={information.bank_cor}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              bank_cor: e.target.value,
            })
          )
        }
      />
      <Input
        placeholder="Наименование банка"
        value={information.bank_name}
        onChange={(e) =>
          dispatch(
            setInformationAction({
              ...information,
              bank_name: e.target.value,
            })
          )
        }
      />

      <div>
        <Image src={`${getImageUrl(information.company_card)}`} width={200} />
        <Input
          type="file"
          placeholder="Карточка предприятия"
          value={information.company_card}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                company_card: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image src={`${getImageUrl(information.inn_file)}`} width={200} />
        <Input
          type="file"
          placeholder="ИНН"
          value={information.inn_file}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                inn_file: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image src={`${getImageUrl(information.ustat)}`} width={200} />
        <Input
          type="file"
          placeholder="Устав"
          value={information.ustat}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                ustat: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image src={`${getImageUrl(information.stamp)}`} width={200} />
        <Input
          type="file"
          placeholder="Подпись"
          value={information.stamp}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                stamp: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image
          src={`${getImageUrl(information.power_of_attorney)}`}
          width={200}
        />
        <Input
          type="file"
          placeholder="Доверенность на исполнительного директора"
          value={information.power_of_attorney}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                power_of_attorney: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image
          src={`${getImageUrl(information.director_signature)}`}
          width={200}
        />
        <Input
          type="file"
          placeholder="Факсимиле генерального директора"
          value={information.director_signature}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                director_signature: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Image
          src={`${getImageUrl(information.authorized_person_signature)}`}
          width={200}
        />
        <Input
          type="file"
          placeholder="Факсимиле исполняющего обязанности"
          value={information.authorized_person_signature}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                authorized_person_signature: e.target.value,
              })
            )
          }
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <div>
        <Input
          placeholder="Выберите от чьего имени подписываются доки"
          type="select"
          value={information.general_role}
          onChange={(e) =>
            dispatch(
              setInformationAction({
                ...information,
                general_role: e.target.value as
                  | "director"
                  | "authorized_person",
              })
            )
          }
          options={[
            { label: "Директор", value: "director" },
            {
              label: "Лицо исполняющего обязанности",
              value: "authorized_person",
            },
          ]}
        />
      </div>

      <Button onClick={updateInformation}>Сохранить данные</Button>
      <Button onClick={openInformationChanges}>Архив изменений</Button>

      {isOpenInformationChanges &&
        information_changes.map((information_change) => (
          <InformationChange
            data={information_change}
            key={information_change.id}
          />
        ))}
    </>
  );
});

export default SettingsInformation;
