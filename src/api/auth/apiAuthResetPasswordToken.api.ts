import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiAuthResetPasswordToken = async (
  token: string
): Promise<IResp<null>> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resetPassword`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log(response.data);

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

export default apiAuthResetPasswordToken;
