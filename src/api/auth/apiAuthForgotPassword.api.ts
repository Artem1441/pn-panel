import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiAuthForgotPassword = async ({
  emailOrLogin,
}: {
  emailOrLogin: string;
}): Promise<IResp<null>> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgotPassword`,
      {
        emailOrLogin,
      },
      {
        withCredentials: true,
      }
    );

    return { status: true };
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

export default apiAuthForgotPassword;
