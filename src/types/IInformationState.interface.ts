import IInformation from "./IInformation.interface";
import IInformationChange from "./IInformationChange.interface";

export default interface IInformationState {
  information: IInformation;
  information_changes: IInformationChange[];
}
