import IPassport from "./IPassport.interface";
import StageType from "./StageType.type";

interface IAuthState {
    stage: StageType;
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
    error: string;
    //   token: string;
    //   user_id: number | null;
    //   role: string;
    //   name: string;
    //   surname: string;
    //   speciality: string;
    //   email: string;
    //   password: string;
  }

  export default IAuthState