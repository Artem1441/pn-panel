import IPeriodicity from "./IPeriodicity.interface";
import ISpeciality from "./ISpeciality.interface";
import ITerminationReason from "./ITerminationReason.interface";

export default interface ISettingsState {
  periodicity: IPeriodicity;
  terminationReasons: { speciality: ISpeciality; terminationReasons: ITerminationReason[] }[]
}


