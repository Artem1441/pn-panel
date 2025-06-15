import errors from "@/constants/errors";
import IStudio from "@/types/IStudio.interface";
import isValidDate from "./isValidDate";

const checkStudio = (studio: IStudio): { status: boolean; error?: string } => {
  if (!studio.city_id) {
    return { status: false, error: errors.studio_city_required };
  }
  if (!studio.name.trim()) {
    return { status: false, error: errors.studio_short_name_required };
  }
  if (!isValidDate(studio.general_contract_date)) {
    return {
      status: false,
      error: errors.studio_date_invalid,
    };
  }

  return {
    status: true,
  };
};

export default checkStudio;
