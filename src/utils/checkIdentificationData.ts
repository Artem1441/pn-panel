import IIdentificationData from "@/types/IIdentificationData.interface";
import cleanPhone from "./cleanPhone";

const checkIdentificationData = ({
  name,
  surname,
  phone,
  email,
  inn,
}: IIdentificationData) => {
  if (name.length < 2 || surname.length < 2)
    return {
      status: false,
      error: "Введите имя и фамилию",
    };

  const cleanedPhone = cleanPhone(phone);
  const phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;

  if (
    !cleanedPhone ||
    cleanedPhone.length !== 11 ||
    !phoneRegex.test(phone)
  ) {
    return {
      status: false,
      error: "Введите полный номер телефона",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return {
      status: false,
      error: "Некорректный формат email",
    };
  }

  if (!inn)
    return {
      status: false,
      error: "Введите ИНН",
    };

  return { status: true };
};

export default checkIdentificationData;
