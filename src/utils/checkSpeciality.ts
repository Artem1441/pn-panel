import errors from "@/constants/errors";
import ISpeciality from "@/types/ISpeciality.interface";

const checkSpeciality = (speciality: ISpeciality): { status: boolean; error?: string } => {
  if (!speciality.name.trim()) {
    return { status: false, error: errors.speciality_short_name_required };
  }

  return {
    status: true,
  };
};

export default checkSpeciality;
