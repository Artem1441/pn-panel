import errors from "@/constants/errors";
import IPrice from "@/types/IPrice.interface";
// import isValidDate from "./isValidDate";

const checkPrice = (price: IPrice): { status: boolean; error?: string } => {
  if (!price.city_id) {
    return { status: false, error: errors.price_city_required };
  }
//   if (!studio.name.trim()) {
//     return { status: false, error: errors.studio_short_name_required };
//   }
//   if (!isValidDate(studio.general_contract_date)) {
//     return {
//       status: false,
//       error: errors.studio_date_invalid,
//     };
//   }

  return {
    status: true,
  };
};

export default checkPrice;
