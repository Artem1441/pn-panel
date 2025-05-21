import IPassport from "./IPassport.interface";
import RoleType from "./RoleType.type";
import StageType from "./StageType.type";

interface IAuthState {
  stage: StageType;
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  inn: string;
  confirmationCodeSent: boolean;
  phone: string;
  email: string;
  passport: IPassport;
  bank_bik: string;
  bank_acc: string;
  passport_main: string;
  passport_registration: string;
  photo_front: string;
  error: string;
}

export default IAuthState;
