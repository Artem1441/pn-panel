import errors from "@/constants/errors";
import ICity from "@/types/ICity.interface";

const checkCity = (city: ICity): { status: boolean; error?: string } => {
  if (!city.name.trim()) {
    return { status: false, error: errors.city_short_name_required };
  }

  return {
    status: true,
  };
};

export default checkCity;
