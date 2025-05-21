import errors from "@/constants/errors";
import IIdentificationData from "@/types/IIdentificationData.interface";
import cleanPhone from "./cleanPhone";

const checkIdentificationData = ({
  name,
  surname,
  phone,
  email,
  inn,
}: IIdentificationData): { status: boolean; error?: string } => {
  if (!name.trim() || !surname.trim())
    return {
      status: false,
      error: errors.name_and_surname_invalid,
    };

  const cleanedPhone = cleanPhone(phone);

  if (
    !/^\d{11}$/.test(cleanedPhone) ||
    !/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(phone)
  ) {
    return {
      status: false,
      error: errors.phone_invalid,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: false,
      error: errors.email_invalid,
    };
  }

  if (!/^\d{12}$/.test(inn))
    return {
      status: false,
      error: errors.inn_invalid,
    };

  return { status: true };
};

export default checkIdentificationData;
