import errors from "@/constants/errors";
import IMotivation from "@/types/IMotivation.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiMotivationUpdateMotivation = async ({
  id,
  allowance_data,
  deduction_data,
}: {
  id: IMotivation["id"];
  allowance_data: IMotivation["allowance_data"];
  deduction_data: IMotivation["deduction_data"];
}): Promise<IResp<IMotivation>> => {
  try {
    const response = await axios.put<IResp<IMotivation>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/motivation/updateMotivation`,
      {
        id,
        allowance_data,
        deduction_data,
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

export default apiMotivationUpdateMotivation;
