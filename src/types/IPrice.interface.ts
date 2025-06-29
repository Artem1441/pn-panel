export default interface IPrice {
  id?: number;
  city_id?: number;
  self_employed_data: IPriceSelfEmployedDataItem[];
  clients_mani_data: IPriceClientsDataItem[];
  clients_pedi_data: IPriceClientsDataItem[];
  clients_mani_pedi_four_hands_data: IPriceClientsDataItem[];
  clients_design_data: IPriceClientsDataItem[];
  clients_additional_nail_services_data: IPriceClientsDataItem[];
  clients_brow_arch_data: IPriceClientsDataItem[];
  clients_promo_data: IPriceClientsDataItem[];
  clients_model_data: IPriceClientsDataItem[];
  clients_goods_data: IPriceClientsDataItem[];
}

export interface IPriceSelfEmployedDataItem {
  name: string;
  rent_price: string;
  agent_price: string;
  other: string;
}

export interface IPriceClientsDataItem {
  name: string;
  from: boolean;
  price: string;
  time: string;
}

export type ArrayPriceSelfEmployedDataFieldKey = "self_employed_data";

export type ArrayPriceClientsDataFieldKey =
  | "clients_mani_data"
  | "clients_pedi_data"
  | "clients_mani_pedi_four_hands_data"
  | "clients_design_data"
  | "clients_additional_nail_services_data"
  | "clients_brow_arch_data"
  | "clients_promo_data"
  | "clients_model_data"
  | "clients_goods_data";

export interface IPriceState {
  price: IPrice;
}
