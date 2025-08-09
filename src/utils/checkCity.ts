import errors from "@/constants/errors";
import ICity from "@/types/ICity.interface";

const checkCity = (city: ICity): { status: boolean; error?: string } => {
  if (!city.name.trim()) {
    return { status: false, error: errors.city_name_required };
  }

  if (!city.city_code.trim()) {
    return { status: false, error: errors.city_code_required };
  }

  return {
    status: true,
  };
};

export default checkCity;
