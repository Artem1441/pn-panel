import { FC, JSX, memo, useEffect, useState } from "react";
import apiStudioGetStudios from "@/api/studio/apiStudioGetStudios.api";
import apiStudioCreateStudio from "@/api/studio/apiStudioCreateStudio.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import { studioSlice } from "@/store/reducers/studio.reducer";
import IStudio from "@/types/IStudio.interface";
import Alert from "@/components/Alert";
import checkStudio from "@/utils/checkStudio";
import apiStudioUpdateStudio from "@/api/studio/apiStudioUpdateStudio.api";
import apiStudioDeleteStudio from "@/api/studio/apiStudioDeleteStudio.api";
import ICity from "@/types/ICity.interface";
import apiCityGetCities from "@/api/city/apiCityGetCities.api";

const Studio: FC<{
  data: IStudio;
  getStudios: () => void;
  cities: ICity[];
}> = ({ data, getStudios, cities }): JSX.Element => {
  const [studio, setStudio] = useState<IStudio>(data);

  const updateStudio = async () => {
    const isValid = checkStudio(studio);
    if (isValid.status) {
      try {
        const res = await apiStudioUpdateStudio({
          id: studio.id,
          city_id: studio.city_id,
          name: studio.name,
          general_full_address: studio.general_full_address,
          general_area: studio.general_area,
          general_cadastral_number: studio.general_cadastral_number,
          general_contract_number: studio.general_contract_number,
          general_contract_date: studio.general_contract_date,
          general_registration: studio.general_registration,
          general_rent_price_per_sqm: studio.general_rent_price_per_sqm,
          general_owner_last_name: studio.general_owner_last_name,
          general_owner_first_name: studio.general_owner_first_name,
          general_owner_middle_name: studio.general_owner_middle_name,
          general_owner_phone: studio.general_owner_phone,
          general_owner_email: studio.general_owner_email,
          general_coowner_available: studio.general_coowner_available,
          general_coowner_last_name: studio.general_coowner_last_name,
          general_coowner_first_name: studio.general_coowner_first_name,
          general_coowner_middle_name: studio.general_coowner_middle_name,
          general_coowner_phone: studio.general_coowner_phone,
          general_coowner_email: studio.general_coowner_email,
          general_work_schedule: studio.general_work_schedule,
          general_work_schedule_weekdays: studio.general_work_schedule_weekdays,
          general_work_schedule_weekends: studio.general_work_schedule_weekends,
          general_wifi_password: studio.general_wifi_password,
          general_alarm_code: studio.general_alarm_code,
          general_lock_code: studio.general_lock_code,
          general_services_mani: studio.general_services_mani,
          general_services_pedi: studio.general_services_pedi,
          general_services_brows: studio.general_services_brows,
          general_sublease_available: studio.general_sublease_available,
          general_sublease_area: studio.general_sublease_area,
          general_sublease_activity_type: studio.general_sublease_activity_type,
          general_sublease_rent_price_per_sqm:
            studio.general_sublease_rent_price_per_sqm,
          general_sublease_contact_last_name:
            studio.general_sublease_contact_last_name,
          general_sublease_contact_first_name:
            studio.general_sublease_contact_first_name,
          general_sublease_contact_middle_name:
            studio.general_sublease_contact_middle_name,
          general_sublease_contact_phone: studio.general_sublease_contact_phone,
          general_sublease_contact_email: studio.general_sublease_contact_email,
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

  const deleteStudio = async () => {
    try {
      const res = await apiStudioDeleteStudio({ id: data.id });

      console.log(res);
      if (res.status) {
        getStudios();
      } else {
        Alert.show({
          title: "Что-то пошлое не так",
          text: "Ошибка при удалении",
          icon: "error",
        });
      }
    } catch (err) {
      console.log(err);
      Alert.show({
        title: "Что-то пошлое не так",
        text: "Ошибка при удалении",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <br />
      <hr />
      <br />
      <div>
        <Input
          placeholder="Выберите город"
          type="select"
          value={String(studio.city_id || "")}
          onChange={(e) =>
            setStudio({
              ...studio,
              city_id: Number(e.target.value),
            })
          }
          options={cities.map((city: ICity) => ({
            label: city.name,
            value: String(city.id),
          }))}
        />
        <Input
          placeholder="Краткий адрес"
          value={studio.name}
          onChange={(e) => setStudio({ ...studio, name: e.target.value })}
        />

        <Input
          placeholder="полный адрес студии"
          value={studio.general_full_address}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_full_address: e.target.value,
            })
          }
        />

        <Input
          placeholder="площадь"
          value={studio.general_area}
          onChange={(e) =>
            setStudio({ ...studio, general_area: e.target.value })
          }
        />

        <Input
          placeholder="кадастровый номер"
          value={studio.general_cadastral_number}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_cadastral_number: e.target.value,
            })
          }
        />

        <Input
          placeholder="№ договора"
          value={studio.general_contract_number}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_contract_number: e.target.value,
            })
          }
        />

        <Input
          type="date"
          placeholder="дата"
          value={studio.general_contract_date}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_contract_date: e.target.value,
            })
          }
        />

        <Input
          placeholder="регистрационные данные"
          value={studio.general_registration}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_registration: e.target.value,
            })
          }
        />

        <Input
          placeholder="цена аренды"
          value={studio.general_rent_price_per_sqm}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_rent_price_per_sqm: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Input
          placeholder="фамилия владельца"
          value={studio.general_owner_last_name}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_owner_last_name: e.target.value,
            })
          }
        />

        <Input
          placeholder="имя владельца"
          value={studio.general_owner_first_name}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_owner_first_name: e.target.value,
            })
          }
        />

        <Input
          placeholder="отчество владельца"
          value={studio.general_owner_middle_name}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_owner_middle_name: e.target.value,
            })
          }
        />

        <Input
          type="phone"
          placeholder="телефон владельца"
          value={studio.general_owner_phone}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_owner_phone: e.target.value,
            })
          }
        />

        <Input
          placeholder="почта владельца"
          value={studio.general_owner_email}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_owner_email: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Button
          onClick={() =>
            setStudio({
              ...studio,
              general_coowner_available: !studio.general_coowner_available,
            })
          }
        >
          {studio.general_coowner_available
            ? "Один владелец"
            : "Есть второй владелец"}
        </Button>

        {studio.general_coowner_available && (
          <>
            <Input
              placeholder="фамилия совладельца"
              value={studio.general_coowner_last_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_coowner_last_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="имя совладельца"
              value={studio.general_coowner_first_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_coowner_first_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="отчество совладельца"
              value={studio.general_coowner_middle_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_coowner_middle_name: e.target.value,
                })
              }
            />

            <Input
              type="phone"
              placeholder="телефон совладельца"
              value={studio.general_coowner_phone}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_coowner_phone: e.target.value,
                })
              }
            />

            <Input
              placeholder="почта совладельца"
              value={studio.general_coowner_email}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_coowner_email: e.target.value,
                })
              }
            />
          </>
        )}
      </div>
      <div>
        <Input
          placeholder="режим работы"
          value={studio.general_work_schedule}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_work_schedule: e.target.value,
            })
          }
        />
        <Input
          placeholder="будни"
          value={studio.general_work_schedule_weekdays}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_work_schedule_weekdays: e.target.value,
            })
          }
        />
        <Input
          placeholder="выходные"
          value={studio.general_work_schedule_weekends}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_work_schedule_weekends: e.target.value,
            })
          }
        />
        <Input
          placeholder="пароль от Wi-Fi"
          value={studio.general_wifi_password}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_wifi_password: e.target.value,
            })
          }
        />
        <Input
          placeholder="код сигналки"
          value={studio.general_alarm_code}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_alarm_code: e.target.value,
            })
          }
        />
        <Input
          placeholder="код от замка"
          value={studio.general_lock_code}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_lock_code: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="маникюр"
          value={studio.general_services_mani}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_services_mani: e.target.value,
            })
          }
        />
        <Input
          type="number"
          placeholder="педикюр"
          value={studio.general_services_pedi}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_services_pedi: e.target.value,
            })
          }
        />
        <Input
          type="number"
          placeholder="брови"
          value={studio.general_services_brows}
          onChange={(e) =>
            setStudio({
              ...studio,
              general_services_brows: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Button
          onClick={() =>
            setStudio({
              ...studio,
              general_sublease_available: !studio.general_sublease_available,
            })
          }
        >
          {studio.general_sublease_available
            ? "Без субаренды"
            : "Будет субаренда"}
        </Button>

        {studio.general_sublease_available && (
          <>
            <Input
              placeholder="площадь субаренды"
              value={studio.general_sublease_area}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_area: e.target.value,
                })
              }
            />
            <Input
              placeholder="вид деятельности субаренды"
              value={studio.general_sublease_activity_type}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_activity_type: e.target.value,
                })
              }
            />
            <Input
              placeholder="цена аренды субаренды"
              value={studio.general_sublease_rent_price_per_sqm}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_rent_price_per_sqm: e.target.value,
                })
              }
            />

            <Input
              placeholder="фамилия субарендатора"
              value={studio.general_sublease_contact_last_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_contact_last_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="имя субарендатора"
              value={studio.general_sublease_contact_first_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_contact_first_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="отчество субарендатора"
              value={studio.general_sublease_contact_middle_name}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_contact_middle_name: e.target.value,
                })
              }
            />

            <Input
              type="phone"
              placeholder="телефон субарендатора"
              value={studio.general_sublease_contact_phone}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_contact_phone: e.target.value,
                })
              }
            />

            <Input
              placeholder="почта субарендатора"
              value={studio.general_sublease_contact_email}
              onChange={(e) =>
                setStudio({
                  ...studio,
                  general_sublease_contact_email: e.target.value,
                })
              }
            />
          </>
        )}
      </div>
      <Button onClick={updateStudio}>Обновить студию</Button>
      <Button onClick={deleteStudio}>Удалить студию</Button>
    </div>
  );
};

const SettingsStudios: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setStudioAction, setResetStudioAction } = studioSlice.actions;
  const { studio } = useAppSelector((state) => state.studioReducer);
  const [cities, setCities] = useState<ICity[]>([]);
  const [studios, setStudios] = useState<IStudio[]>([]);

  useEffect(() => {
    getStudios();
    getCities();
  }, []);

  const getCities = async () => {
    const res = await apiCityGetCities();
    if (res.status && res.data) {
      setCities(res.data);
    }
  };

  const getStudios = async () => {
    const res = await apiStudioGetStudios();
    if (res.status && res.data) setStudios(res.data);
  };

  const createStudio = async () => {
    const isValid = checkStudio(studio);
    if (isValid.status) {
      try {
        const res = await apiStudioCreateStudio({
          city_id: studio.city_id,
          name: studio.name,
          general_full_address: studio.general_full_address,
          general_area: studio.general_area,
          general_cadastral_number: studio.general_cadastral_number,
          general_contract_number: studio.general_contract_number,
          general_contract_date: studio.general_contract_date,
          general_registration: studio.general_registration,
          general_rent_price_per_sqm: studio.general_rent_price_per_sqm,
          general_owner_last_name: studio.general_owner_last_name,
          general_owner_first_name: studio.general_owner_first_name,
          general_owner_middle_name: studio.general_owner_middle_name,
          general_owner_phone: studio.general_owner_phone,
          general_owner_email: studio.general_owner_email,
          general_coowner_available: studio.general_coowner_available,
          general_coowner_last_name: studio.general_coowner_last_name,
          general_coowner_first_name: studio.general_coowner_first_name,
          general_coowner_middle_name: studio.general_coowner_middle_name,
          general_coowner_phone: studio.general_coowner_phone,
          general_coowner_email: studio.general_coowner_email,
          general_work_schedule: studio.general_work_schedule,
          general_work_schedule_weekdays: studio.general_work_schedule_weekdays,
          general_work_schedule_weekends: studio.general_work_schedule_weekends,
          general_wifi_password: studio.general_wifi_password,
          general_alarm_code: studio.general_alarm_code,
          general_lock_code: studio.general_lock_code,
          general_services_mani: studio.general_services_mani,
          general_services_pedi: studio.general_services_pedi,
          general_services_brows: studio.general_services_brows,
          general_sublease_available: studio.general_sublease_available,
          general_sublease_area: studio.general_sublease_area,
          general_sublease_activity_type: studio.general_sublease_activity_type,
          general_sublease_rent_price_per_sqm:
            studio.general_sublease_rent_price_per_sqm,
          general_sublease_contact_last_name:
            studio.general_sublease_contact_last_name,
          general_sublease_contact_first_name:
            studio.general_sublease_contact_first_name,
          general_sublease_contact_middle_name:
            studio.general_sublease_contact_middle_name,
          general_sublease_contact_phone: studio.general_sublease_contact_phone,
          general_sublease_contact_email: studio.general_sublease_contact_email,
        });

        if (res.status) {
          getStudios();
          dispatch(setResetStudioAction());
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: isValid.error,
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
          placeholder="Выберите город"
          type="select"
          value={String(studio.city_id || "")}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                city_id: Number(e.target.value),
              })
            )
          }
          options={cities.map((city) => ({
            label: city.name,
            value: String(city.id),
          }))}
        />

        <Input
          placeholder="Краткий адрес"
          value={studio.name}
          onChange={(e) =>
            dispatch(setStudioAction({ ...studio, name: e.target.value }))
          }
        />

        <Input
          placeholder="полный адрес студии"
          value={studio.general_full_address}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_full_address: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="площадь"
          value={studio.general_area}
          onChange={(e) =>
            dispatch(
              setStudioAction({ ...studio, general_area: e.target.value })
            )
          }
        />

        <Input
          placeholder="кадастровый номер"
          value={studio.general_cadastral_number}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_cadastral_number: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="№ договора"
          value={studio.general_contract_number}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_contract_number: e.target.value,
              })
            )
          }
        />

        <Input
          type="date"
          placeholder="дата"
          value={studio.general_contract_date}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_contract_date: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="регистрационные данные"
          value={studio.general_registration}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_registration: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="цена аренды"
          value={studio.general_rent_price_per_sqm}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_rent_price_per_sqm: e.target.value,
              })
            )
          }
        />
      </div>

      <div>
        <Input
          placeholder="фамилия владельца"
          value={studio.general_owner_last_name}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_owner_last_name: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="имя владельца"
          value={studio.general_owner_first_name}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_owner_first_name: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="отчество владельца"
          value={studio.general_owner_middle_name}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_owner_middle_name: e.target.value,
              })
            )
          }
        />

        <Input
          type="phone"
          placeholder="телефон владельца"
          value={studio.general_owner_phone}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_owner_phone: e.target.value,
              })
            )
          }
        />

        <Input
          placeholder="почта владельца"
          value={studio.general_owner_email}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_owner_email: e.target.value,
              })
            )
          }
        />
      </div>

      <div>
        <Button
          onClick={() =>
            dispatch(
              setStudioAction({
                ...studio,
                general_coowner_available: !studio.general_coowner_available,
              })
            )
          }
        >
          {studio.general_coowner_available
            ? "Один владелец"
            : "Есть второй владелец"}
        </Button>

        {studio.general_coowner_available && (
          <>
            <Input
              placeholder="фамилия совладельца"
              value={studio.general_coowner_last_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_coowner_last_name: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="имя совладельца"
              value={studio.general_coowner_first_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_coowner_first_name: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="отчество совладельца"
              value={studio.general_coowner_middle_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_coowner_middle_name: e.target.value,
                  })
                )
              }
            />

            <Input
              type="phone"
              placeholder="телефон совладельца"
              value={studio.general_coowner_phone}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_coowner_phone: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="почта совладельца"
              value={studio.general_coowner_email}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_coowner_email: e.target.value,
                  })
                )
              }
            />
          </>
        )}
      </div>

      <div>
        <Input
          placeholder="режим работы"
          value={studio.general_work_schedule}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_work_schedule: e.target.value,
              })
            )
          }
        />
        <Input
          placeholder="будни"
          value={studio.general_work_schedule_weekdays}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_work_schedule_weekdays: e.target.value,
              })
            )
          }
        />
        <Input
          placeholder="выходные"
          value={studio.general_work_schedule_weekends}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_work_schedule_weekends: e.target.value,
              })
            )
          }
        />
        <Input
          placeholder="пароль от Wi-Fi"
          value={studio.general_wifi_password}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_wifi_password: e.target.value,
              })
            )
          }
        />
        <Input
          placeholder="код сигналки"
          value={studio.general_alarm_code}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_alarm_code: e.target.value,
              })
            )
          }
        />
        <Input
          placeholder="код от замка"
          value={studio.general_lock_code}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_lock_code: e.target.value,
              })
            )
          }
        />
      </div>

      <div>
        <Input
          type="number"
          placeholder="маникюр"
          value={studio.general_services_mani}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_services_mani: e.target.value,
              })
            )
          }
        />
        <Input
          type="number"
          placeholder="педикюр"
          value={studio.general_services_pedi}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_services_pedi: e.target.value,
              })
            )
          }
        />
        <Input
          type="number"
          placeholder="брови"
          value={studio.general_services_brows}
          onChange={(e) =>
            dispatch(
              setStudioAction({
                ...studio,
                general_services_brows: e.target.value,
              })
            )
          }
        />
      </div>

      <div>
        <Button
          onClick={() =>
            dispatch(
              setStudioAction({
                ...studio,
                general_sublease_available: !studio.general_sublease_available,
              })
            )
          }
        >
          {studio.general_sublease_available
            ? "Без субаренды"
            : "Будет субаренда"}
        </Button>

        {studio.general_sublease_available && (
          <>
            <Input
              placeholder="площадь субаренды"
              value={studio.general_sublease_area}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_area: e.target.value,
                  })
                )
              }
            />
            <Input
              placeholder="вид деятельности субаренды"
              value={studio.general_sublease_activity_type}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_activity_type: e.target.value,
                  })
                )
              }
            />
            <Input
              placeholder="цена аренды субаренды"
              value={studio.general_sublease_rent_price_per_sqm}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_rent_price_per_sqm: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="фамилия субарендатора"
              value={studio.general_sublease_contact_last_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_contact_last_name: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="имя субарендатора"
              value={studio.general_sublease_contact_first_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_contact_first_name: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="отчество субарендатора"
              value={studio.general_sublease_contact_middle_name}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_contact_middle_name: e.target.value,
                  })
                )
              }
            />

            <Input
              type="phone"
              placeholder="телефон субарендатора"
              value={studio.general_sublease_contact_phone}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_contact_phone: e.target.value,
                  })
                )
              }
            />

            <Input
              placeholder="почта субарендатора"
              value={studio.general_sublease_contact_email}
              onChange={(e) =>
                dispatch(
                  setStudioAction({
                    ...studio,
                    general_sublease_contact_email: e.target.value,
                  })
                )
              }
            />
          </>
        )}
      </div>

      <Button onClick={createStudio}>Создать студию</Button>

      {studios.map((studio: IStudio) => (
        <Studio
          key={studio.id}
          data={studio}
          getStudios={getStudios}
          cities={cities}
        />
      ))}
    </>
  );
});

export default SettingsStudios;
