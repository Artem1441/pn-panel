import errors from "@/constants/errors";
import IStudio from "@/types/IStudio.interface";

const checkStudio = (studio: IStudio): { status: boolean; error?: string } => {
  if (!studio.name.trim()) {
    return { status: false, error: errors.studio_short_name_required };
  }

  return {
    status: true,
  };
};

export default checkStudio;
