import IPassport from "./IPassport.interface";

interface IPersonalData {
  passport: IPassport;
  bank_bik: string;
  bank_acc: string;
  passport_main: string;
  passport_registration: string;
  photo_front: string;
}

export default IPersonalData;
