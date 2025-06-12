import errors from "@/constants/errors";
import IInformation from "@/types/IInformation.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiInformationUpdateInformation = async (
  information: IInformation
): Promise<IResp<IInformation>> => {
  try {
    const response = await axios.put<IResp<IInformation>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/information/updateInformation`,
      {
        information,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response)

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

export default apiInformationUpdateInformation;
