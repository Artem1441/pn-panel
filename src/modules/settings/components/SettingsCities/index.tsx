import { FC, JSX, memo, useEffect, useState } from "react"
import apiCityCreateCity from "@/api/city/apiCityCreateCity.api"
import apiCityDeleteCity from "@/api/city/apiCityDeleteCity.api"
import apiCityGetCities from "@/api/city/apiCityGetCities.api"
import apiCityUpdateCity from "@/api/city/apiCityUpdateCity.api"
import Alert from "@/components/Alert"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import Button from "@/shared/Button"
import Input from "@/shared/Input"
import { citySlice } from "@/store/reducers/city.reducer"
import ICity from "@/types/ICity.interface"
import checkCity from "@/utils/checkCity"
import errors from "@/constants/errors"

const City: FC<{ data: ICity; getCities: () => void }> = memo(
  ({ data, getCities }): JSX.Element => {
    const [city, setCity] = useState<ICity>(data)

    const updateCity = async () => {
      const isValid = checkCity(city)
      if (isValid.status) {
        try {
          const res = await apiCityUpdateCity({
            id: city.id,
            name: city.name,
            city_code: city.city_code
          })

          if (!res.status) {
            Alert.show({
              title: "Что-то пошлое не так",
              text: res.error,
              icon: "error",
            })
          }
        } catch (err) {
          console.log(err)
          Alert.show({
            title: "Что-то пошлое не так",
            text: JSON.stringify(err),
            icon: "error",
          })
        }
      } else {
        Alert.show({
          title: "Что-то пошлое не так",
          text: isValid.error,
          icon: "error",
        })
      }
    }

    const deleteCity = async () => {
      try {
        const res = await apiCityDeleteCity({ id: data.id })

        console.log(res)
        if (res.status) {
          getCities()
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: res.error,
            icon: "error",
          })
        }
      } catch (err) {
        console.log(err)
        Alert.show({
          title: "Что-то пошлое не так",
          text: errors.network_error,
          icon: "error",
        })
      }
    }

    return (
      <>
        <div>
          <Input
            placeholder="Название города"
            value={city.name}
            onChange={(e) => setCity({ ...city, name: e.target.value })}
          />
        </div>

        <div>
          <Input
            placeholder="Код города"
            value={city.city_code}
            onChange={(e) => setCity({ ...city, city_code: e.target.value })}
          />
        </div>

        <div>
          <Button onClick={updateCity}>Обновить город</Button>
          <Button onClick={deleteCity}>Удалить город</Button>
        </div>
      </>
    )
  }
)

const SettingsCities: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch()
  const { setCityAction, setResetCityAction } = citySlice.actions
  const { city } = useAppSelector((state) => state.cityReducer)
  const [cities, setCities] = useState<ICity[]>([])

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    const res = await apiCityGetCities()
    if (res.status && res.data) setCities(res.data)
  }

  const createCity = async () => {
    const isValid = checkCity(city)
    if (isValid.status) {
      try {
        const res = await apiCityCreateCity({
          name: city.name,
          city_code: city.city_code,
        })

        if (res.status) {
          getCities()
          dispatch(setResetCityAction())
        } else {
          Alert.show({
            title: "Что-то пошлое не так",
            text: res.error,
            icon: "error",
          })
        }
      } catch (err) {
        Alert.show({
          title: "Что-то пошлое не так",
          text: isValid.error,
          icon: "error",
        })
      }
    } else {
      Alert.show({
        title: "Что-то пошлое не так",
        text: isValid.error,
        icon: "error",
      })
    }
  }

  return (
    <>
      <div>
        <Input
          placeholder="Название города"
          value={city.name}
          onChange={(e) =>
            dispatch(setCityAction({ ...city, name: e.target.value }))
          }
        />

        <Input
          placeholder="Код города"
          value={city.city_code}
          onChange={(e) =>
            dispatch(setCityAction({ ...city, city_code: e.target.value }))
          }
        />

        <Button onClick={createCity}>Создать город</Button>

        {cities.map((city) => (
          <City key={city.id} data={city} getCities={getCities} />
        ))}
      </div>
    </>
  )
})

export default SettingsCities
