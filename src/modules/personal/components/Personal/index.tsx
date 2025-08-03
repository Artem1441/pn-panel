import apiPersonalGetPersonalData from "@/api/personal/apiPersonalGetPersonalData.api";
import Image from "@/shared/Image";
import Input from "@/shared/Input";
import ISpeciality from "@/types/ISpeciality.interface";
import IStudio from "@/types/IStudio.interface";
import IUser from "@/types/IUser.interface";
import getImageUrl from "@/utils/getImageUrl";
import { FC, JSX, useEffect, useState } from "react";

interface IPersonalData {
  surname: IUser["surname"];
  name: IUser["name"];
  patronymic: IUser["patronymic"];
  inn: IUser["inn"];
  phone: IUser["phone"];
  email: IUser["email"];
  passport: IUser["passport"];
  bank_acc: IUser["bank_acc"];
  bank_bik: IUser["bank_bik"];
  passport_main: IUser["passport_main"];
  passport_registration: IUser["passport_registration"];
  photo_front: IUser["photo_front"];
  login: IUser["login"];
  speciality_name: ISpeciality["name"];
  studios: {
    name: IStudio["name"];
    general_wifi_password?: IStudio["general_wifi_password"];
  }[];
}

const Personal: FC = (): JSX.Element => {
  const [personalData, setPersonalData] = useState<IPersonalData>({
    surname: "",
    name: "",
    patronymic: "",
    inn: "",
    phone: "",
    email: "",
    passport: {
      passport_series: "",
      passport_number: "",
      issue_date: "",
      issued_by: "",
      nationality: "",
      registration_address: "",
      residential_address: "",
      birthdate: "",
    },
    bank_acc: "",
    bank_bik: "",
    passport_main: "",
    passport_registration: "",
    photo_front: "",
    login: "",
    speciality_name: "",
    studios: [],
  });
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const getPersonalData = async () => {
    const res = await apiPersonalGetPersonalData<IPersonalData>();
    if (res.status && res.data) {
      setPersonalData(res.data);
    }
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  return (
    <>
      <p>Имя: {personalData.name}</p>
      <p>Фамилия: {personalData.surname}</p>
      <p>Отчество: {personalData.patronymic}</p>
      <p>ИНН: {personalData.inn}</p>
      <p>Телефон: {personalData.phone}</p>
      <p>Email: {personalData.email}</p>

      <p>Серия: {personalData.passport?.passport_series}</p>
      <p>Номер: {personalData.passport?.passport_number}</p>
      <p>Дата выдачи: {personalData.passport?.issue_date}</p>
      <p>Выдан кем: {personalData.passport?.issued_by}</p>
      <p>Национальность: {personalData.passport?.nationality}</p>
      <p>Адрес регистрации {personalData.passport?.registration_address}</p>
      <p>Адрес проживания {personalData.passport?.residential_address}</p>
      <p>Дата рождения: {personalData.passport?.birthdate}</p>

      <p>БИК: {personalData.bank_acc}</p>
      <p>Р/С: {personalData.bank_bik}</p>

      <div>
        <p>Основная страница паспорта</p>
        <Image src={getImageUrl(personalData.passport_main)} width={200} />
      </div>
      <div>
        <p>Страница паспорта с пропиской</p>
        <Image
          src={getImageUrl(personalData.passport_registration)}
          width={200}
        />
      </div>
      <div>
        <p>Личное фото (анфас) на светлом фоне</p>
        <Image src={getImageUrl(personalData.photo_front)} width={200} />
      </div>

      <p>Специальность: {personalData.speciality_name}</p>

      {personalData.studios.map((studio) => (
        <div>
          <p>Название студии: {studio.name}</p>
          <p>Пароль от wifi в студии: {studio.general_wifi_password}</p>
        </div>
      ))}

      <p>Ваш логин: {personalData.login}</p>

      <div>
        <p>Сброс пароля</p>

        {/* <Input 
        
        /> */}
      </div>
    </>
  );
};

export default Personal;
