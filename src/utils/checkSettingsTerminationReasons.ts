import errors from "@/constants/errors";
import ISpeciality from "@/types/ISpeciality.interface";
import ITerminationReason from "@/types/ITerminationReason.interface";

const checkSettingsTerminationReasons = (
  terminationReasons: {
    speciality: ISpeciality;
    terminationReasons: ITerminationReason[];
  }[]
): { status: boolean; error?: string } => {
  for (const item of terminationReasons) {
    for (const terminationReason of item.terminationReasons) {
      if (
        !terminationReason.reason.trim() ||
        !terminationReason.description.trim()
      ) {
        return {
          status: false,
          error: errors.termination_reasons_fields_required,
        };
      }
    }
  }

  return { status: true };
};

export default checkSettingsTerminationReasons;
