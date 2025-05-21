import errors from "@/constants/errors";
import IPersonalData from "@/types/IPersonalData.interface";
import isAdult from "./isAdult";
import isValidDate from "./isValidDate";

const checkPersonalData = ({
  passport,
  bank_bik,
  bank_acc,
  passport_main,
  passport_registration,
  photo_front,
}: IPersonalData): { status: boolean; error?: string } => {
  if (!/^\d{4}$/.test(passport.passport_series))
    return {
      status: false,
      error: errors.passport_series_invalid,
    };

  if (!/^\d{6}$/.test(passport.passport_number))
    return {
      status: false,
      error: errors.passport_number_invalid,
    };

  if (!isValidDate(passport.issue_date)) {
    return {
      status: false,
      error: errors.issue_date_invalid,
    };
  }

  if (!passport.issued_by.trim()) {
    return {
      status: false,
      error: errors.issued_by_invalid,
    };
  }

  if (!isValidDate(passport.birthdate) || !isAdult(passport.birthdate)) {
    return {
      status: false,
      error: errors.birthday_invalid,
    };
  }

  if (!["РФ", "Российская Федерация"].includes(passport.nationality.trim())) {
    return {
      status: false,
      error: errors.nationality_invalid,
    };
  }

  if (!passport.registration_address.trim()) {
    return {
      status: false,
      error: errors.registration_address_invalid,
    };
  }

  if (!passport.residential_address.trim()) {
    return {
      status: false,
      error: errors.residential_address_invalid,
    };
  }

  if (!/^\d{9}$/.test(bank_bik)) {
    return {
      status: false,
      error: errors.bank_bik_required,
    };
  }

  if (!/^\d{20}$/.test(bank_acc)) {
    return {
      status: false,
      error: errors.bank_acc_required,
    };
  }

  if (!passport_main) {
    return {
      status: false,
      error: errors.passport_main_required,
    };
  }

  if (!passport_registration) {
    return {
      status: false,
      error: errors.passport_registration_required,
    };
  }

  if (!photo_front) {
    return {
      status: false,
      error: errors.photo_front_required,
    };
  }

  return { status: true };
};

export default checkPersonalData;
