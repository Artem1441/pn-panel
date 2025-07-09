import ISpeciality from "./ISpeciality.interface";

export default interface ITerminationReason {
  id?: number;
  speciality_id: number;
  speciality?: ISpeciality;
  reason: string;
  description: string;
}
