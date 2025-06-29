export default interface IMotivation {
  id?: number;
  allowance_data: IMotivationDataItem[];
  deduction_data: IMotivationDataItem[];
}

export interface IMotivationDataItem {
  name: string;
  condition: string;
  price: string;
}

export type ArrayMotivationDataFieldKey = "allowance_data" | "deduction_data";
export interface IMotivationState {
  motivation: IMotivation;
}
