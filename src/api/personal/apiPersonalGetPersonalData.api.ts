import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiPersonalGetPersonalData = async <T>(): Promise<
  IResp<T>
> => {
  try {
    const response = await axios.get<IResp<T>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/personal/getPersonalData`,
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

export default apiPersonalGetPersonalData;
