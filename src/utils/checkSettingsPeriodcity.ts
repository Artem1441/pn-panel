import IPeriodicity from "@/types/IPeriodicity.interface";

const checkSettingsPeriodcity = (
  periodcity: IPeriodicity
): { status: boolean; error?: string } => {

  return { status: true };
};

export default checkSettingsPeriodcity;
