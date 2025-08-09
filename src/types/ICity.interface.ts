export default interface ICity {
  id?: number;
  name: string;
  city_code: string;
}

export interface ICityState {
  city: ICity;
}
