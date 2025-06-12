
import IInformation from "./IInformation.interface";
import IInformationChange from "./IInformationChange.interface";

interface IInformationState {
    information: IInformation
    information_changes: IInformationChange[]
}

export default IInformationState;
