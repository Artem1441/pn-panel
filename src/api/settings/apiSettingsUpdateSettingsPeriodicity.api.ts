import errors from "@/constants/errors";
import IPeriodicity from "@/types/IPeriodicity.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiSettingsUpdateSettingsPeriodicity = async ({
  id,
  reporting_frequency,
  reporting_day_of_week,
  document_send_frequency,
  document_send_email,
}: {
  id: IPeriodicity["id"];
  reporting_frequency: IPeriodicity["reporting_frequency"];
  reporting_day_of_week: IPeriodicity["reporting_day_of_week"];
  document_send_frequency: IPeriodicity["document_send_frequency"];
  document_send_email: IPeriodicity["document_send_email"];
}): Promise<IResp<null>> => {
  try {
    const response = await axios.put<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings/updateSettingsPeriodicity`,
      {
        id,
        reporting_frequency,
        reporting_day_of_week,
        document_send_frequency,
        document_send_email,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.status) {
      return response.data;
    } else {
      return {
        status: false,
        error: response.data.error || errors.unknown_error,
      };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: false,
        error: err.response?.data?.error || errors.network_error,
      };
    } else {
      return {
        status: false,
        error: errors.unexpected_error,
      };
    }
  }
};

export default apiSettingsUpdateSettingsPeriodicity;
