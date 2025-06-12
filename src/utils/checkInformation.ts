import errors from "@/constants/errors";
import IInformation from "@/types/IInformation.interface";
// import cleanPhone from "./cleanPhone";

const hasEmptyFields = (information: IInformation): boolean => {
  return Object.entries(information).some(([key, value]) => {
    if (key === "id" || key === "general_role") return false;
    return value.trim() === "";
  });
};

const checkInformation = (
  information: IInformation
): { status: boolean; error?: string } => {
  if (hasEmptyFields(information)) {
    return {
      status: false,
      error: errors.all_fields_required,
    };
  }

//   const cleanedAccountingPhone = cleanPhone(information.accounting_phone);
//   const cleanedContactPhone = cleanPhone(information.contact_phone);

//   if (
//     !/^\d{11}$/.test(cleanedAccountingPhone) ||
//     !/^\d{11}$/.test(cleanedContactPhone) ||
//     !/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(information.accounting_phone) ||
//     !/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(information.contact_phone)
//   ) {
//     return {
//       status: false,
//       error: errors.phone_invalid,
//     };
//   }

//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(information.email)) {
//     return {
//       status: false,
//       error: errors.email_invalid,
//     };
//   }

  return { status: true };
};

export default checkInformation;
