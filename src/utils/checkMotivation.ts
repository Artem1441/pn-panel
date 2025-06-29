// import errors from "@/constants/errors";
import IMotivation from "@/types/IMotivation.interface";

const checkMotivation = (motivation: IMotivation): { status: boolean; error?: string } => {
//   if (motivation.allowance_data) {
//     return { status: false, error: errors.city_short_name_required };
//   }

  return {
    status: true,
  };
};

export default checkMotivation;
