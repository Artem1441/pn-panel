import apiCityGetCities from "@/api/city/apiCityGetCities.api";
import apiPriceCreatePrice from "@/api/price/apiPriceCreatePrice.api";
import apiPriceDeletePrice from "@/api/price/apiPriceDeletePrice.api";
import apiPriceGetPrices from "@/api/price/apiPriceGetPrices.api";
import apiPriceUpdatePrice from "@/api/price/apiPriceUpdatePrice.api";
import Alert from "@/components/Alert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import { priceSlice } from "@/store/reducers/price.reducer";
import ICity from "@/types/ICity.interface";
import IPrice, {
  ArrayPriceClientsDataFieldKey,
  ArrayPriceSelfEmployedDataFieldKey,
  IPriceClientsDataItem,
  IPriceSelfEmployedDataItem,
} from "@/types/IPrice.interface";
import checkPrice from "@/utils/checkPrice";
import { FC, JSX, memo, useEffect, useState } from "react";

const Price: FC<{
  data: IPrice;
  getPrices: () => void;
  cities: ICity[];
}> = ({ data, getPrices, cities }): JSX.Element => {
  const [price, setPrice] = useState<IPrice>(data);

  const updatePrice = async () => {
    const isValid = checkPrice(price);
    if (isValid.status) {
      try {
        const res = await apiPriceUpdatePrice({
          id: price.id,
          city_id: price.city_id,
          self_employed_data: price.self_employed_data,
          clients_mani_data: price.clients_mani_data,
          clients_pedi_data: price.clients_pedi_data,
          clients_mani_pedi_four_hands_data:
            price.clients_mani_pedi_four_hands_data,
          clients_design_data: price.clients_design_data,
          clients_additional_nail_services_data:
            price.clients_additional_nail_services_data,
          clients_brow_arch_data: price.clients_brow_arch_data,
          clients_promo_data: price.clients_promo_data,
          clients_model_data: price.clients_model_data,
          clients_goods_data: price.clients_goods_data,
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

  const deletePrice = async () => {
    try {
      const res = await apiPriceDeletePrice({ id: data.id });
      if (res.status) {
        getPrices();
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

  const updatePriceField = <K extends keyof IPrice>(
    field: K,
    data: IPrice[K]
  ) => setPrice({ ...price, [field]: data });

  return (
    <div>
      <br />
      <hr />
      <br />
      <div>
        <Input
          placeholder="Выберите город"
          type="select"
          value={String(price.city_id || "")}
          onChange={(e) =>
            setPrice({
              ...price,
              city_id: Number(e.target.value),
            })
          }
          options={cities.map((city: ICity) => ({
            label: city.name,
            value: String(city.id),
          }))}
        />
      </div>

      <div>
        <h1>Для самозанятых</h1>
        <SelfEmployedTable
          items={price.self_employed_data}
          price={price}
          fieldKey="self_employed_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов маникюр</h1>
        <ClientsTable
          items={price.clients_mani_data}
          price={price}
          fieldKey="clients_mani_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов педикюр</h1>
        <ClientsTable
          items={price.clients_pedi_data}
          price={price}
          fieldKey="clients_pedi_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов маникюр и педикюр в 4 руки</h1>
        <ClientsTable
          items={price.clients_mani_pedi_four_hands_data}
          price={price}
          fieldKey="clients_mani_pedi_four_hands_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов дизайн</h1>
        <ClientsTable
          items={price.clients_design_data}
          price={price}
          fieldKey="clients_design_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов дополнительные услуги ногтевого сервиса</h1>
        <ClientsTable
          items={price.clients_additional_nail_services_data}
          price={price}
          fieldKey="clients_additional_nail_services_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов архитектура бровей</h1>
        <ClientsTable
          items={price.clients_brow_arch_data}
          price={price}
          fieldKey="clients_brow_arch_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов акции</h1>
        <ClientsTable
          title="Для клиентов акции"
          items={price.clients_promo_data}
          price={price}
          fieldKey="clients_promo_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов модели на маникюр</h1>
        <ClientsTable
          items={price.clients_model_data}
          price={price}
          fieldKey="clients_model_data"
          updateField={updatePriceField}
        />
      </div>

      <div>
        <h1>Для клиентов товары</h1>
        <ClientsTable
          items={price.clients_goods_data}
          price={price}
          fieldKey="clients_goods_data"
          updateField={updatePriceField}
        />
      </div>

      <Button onClick={updatePrice}>Обновить прайс-лист</Button>
      <Button onClick={deletePrice}>Удалить прайс-лист</Button>
    </div>
  );
};

const SelfEmployedTable: FC<{
  title: string;
  price: IPrice;
  items: IPriceSelfEmployedDataItem[];
  fieldKey: ArrayPriceSelfEmployedDataFieldKey;
  updateField: <K extends ArrayPriceSelfEmployedDataFieldKey>(
    key: K,
    data: IPrice[K]
  ) => void;
}> = ({ title, price, items, fieldKey, updateField }): JSX.Element => {
  const handleChange = (idx: number, field: string, value: string) => {
    const list = [...price[fieldKey]];
    list[idx] = { ...list[idx], [field]: value };
    updateField(fieldKey, list);
  };

  const handleDelete = (idx: number) => {
    const list = price[fieldKey].filter((_, i) => i !== idx);
    updateField(fieldKey, list);
  };

  const handleAdd = () => {
    const newItem: IPriceSelfEmployedDataItem = {
      name: "",
      rent_price: "",
      agent_price: "",
      other: "",
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
            <th>специальность</th>
            <th>аренда</th>
            <th>агентские</th>
            <th>прочее</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <Input
                  placeholder="Название специальности"
                  value={item.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Цена аренды (руб)"
                  value={item.rent_price}
                  onChange={(e) =>
                    handleChange(i, "rent_price", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Процент агентских (от 0 до 100)"
                  value={item.agent_price}
                  onChange={(e) =>
                    handleChange(i, "agent_price", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Прочие расходы (руб)"
                  value={item.other}
                  onChange={(e) => handleChange(i, "other", e.target.value)}
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

const ClientsTable: FC<{
  title: string;
  price: IPrice;
  items: IPriceClientsDataItem[];
  fieldKey: ArrayPriceClientsDataFieldKey;
  updateField: <K extends ArrayPriceClientsDataFieldKey>(
    key: K,
    data: IPrice[K]
  ) => void;
}> = ({ title, price, items, fieldKey, updateField }): JSX.Element => {
  const handleChange = (
    idx: number,
    field: string,
    value: string | boolean
  ) => {
    const list = [...price[fieldKey]];
    list[idx] = { ...list[idx], [field]: value };
    updateField(fieldKey, list);
  };

  const handleDelete = (idx: number) => {
    const list = price[fieldKey].filter((_, i) => i !== idx);
    updateField(fieldKey, list);
  };

  const handleAdd = () => {
    const newItem: IPriceClientsDataItem = {
      name: "",
      from: false,
      price: "",
      time: "",
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
            <th>услуга</th>
            <th>цена от</th>
            <th>цена</th>
            <th>время</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <Input
                  placeholder="Название услуги"
                  value={item.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="boolean"
                  placeholder="От?"
                  value={item.from}
                  onChange={() => handleChange(i, "from", !item.from)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Стоимость услуги (руб)"
                  value={item.price}
                  onChange={(e) => handleChange(i, "price", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="Время на услугу (мин)"
                  value={item.time}
                  onChange={(e) => handleChange(i, "time", e.target.value)}
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

const SettingsPriceList: FC = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setPriceAction, setResetPriceAction } = priceSlice.actions;
  const { price } = useAppSelector((state) => state.priceReducer);
  const [cities, setCities] = useState<ICity[]>([]);
  const [prices, setPrices] = useState<IPrice[]>([]);

  useEffect(() => {
    getPrices();
    getCities();
  }, []);

  const getCities = async () => {
    const res = await apiCityGetCities();
    if (res.status && res.data) {
      setCities(res.data);
    }
  };

  const getPrices = async () => {
    const res = await apiPriceGetPrices();
    if (res.status && res.data) setPrices(res.data);
  };

  const createPrice = async () => {
    const isValid = checkPrice(price);
    if (isValid.status) {
      try {
        const res = await apiPriceCreatePrice({
          city_id: price.city_id,
          self_employed_data: price.self_employed_data,
          clients_mani_data: price.clients_mani_data,
          clients_pedi_data: price.clients_pedi_data,
          clients_mani_pedi_four_hands_data:
            price.clients_mani_pedi_four_hands_data,
          clients_design_data: price.clients_design_data,
          clients_additional_nail_services_data:
            price.clients_additional_nail_services_data,
          clients_brow_arch_data: price.clients_brow_arch_data,
          clients_promo_data: price.clients_promo_data,
          clients_model_data: price.clients_model_data,
          clients_goods_data: price.clients_goods_data,
        });

        if (res.status) {
          getPrices();
          dispatch(setResetPriceAction());
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

  const updatePriceField = <K extends keyof IPrice>(
    field: K,
    data: IPrice[K]
  ) => {
    dispatch(
      setPriceAction({
        ...price,
        [field]: data,
      })
    );
  };

  return (
    <>
      <div>
        <Input
          placeholder="Выберите город"
          type="select"
          value={String(price.city_id || "")}
          onChange={(e) =>
            dispatch(
              setPriceAction({
                ...price,
                city_id: Number(e.target.value),
              })
            )
          }
          options={cities.map((city) => ({
            label: city.name,
            value: String(city.id),
          }))}
        />
      </div>

        <SelfEmployedTable
          title="Для самозанятых"
          items={price.self_employed_data}
          price={price}
          fieldKey="self_employed_data"
          updateField={updatePriceField}
        />
      <ClientsTable
        title="Для клиентов маникюр"
        items={price.clients_mani_data}
        price={price}
        fieldKey="clients_mani_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов педикюр"
        items={price.clients_pedi_data}
        price={price}
        fieldKey="clients_pedi_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов маникюр и педикюр в 4 руки"
        items={price.clients_mani_pedi_four_hands_data}
        price={price}
        fieldKey="clients_mani_pedi_four_hands_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов дизайн"
        items={price.clients_design_data}
        price={price}
        fieldKey="clients_design_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов дополнительные услуги ногтевого сервиса"
        items={price.clients_additional_nail_services_data}
        price={price}
        fieldKey="clients_additional_nail_services_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов архитектура бровей"
        items={price.clients_brow_arch_data}
        price={price}
        fieldKey="clients_brow_arch_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов акции"
        items={price.clients_promo_data}
        price={price}
        fieldKey="clients_promo_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов модели на маникюр"
        items={price.clients_model_data}
        price={price}
        fieldKey="clients_model_data"
        updateField={updatePriceField}
      />
      <ClientsTable
        title="Для клиентов товары"
        items={price.clients_goods_data}
        price={price}
        fieldKey="clients_goods_data"
        updateField={updatePriceField}
      />

      <Button onClick={createPrice}>Создать прайс-лист</Button>

      {prices.map((price: IPrice) => (
        <Price
          key={price.id}
          data={price}
          getPrices={getPrices}
          cities={cities}
        />
      ))}
    </>
  );
});

export default SettingsPriceList;
