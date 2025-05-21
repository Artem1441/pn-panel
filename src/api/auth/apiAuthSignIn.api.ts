import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IUser from "@/types/IUser.interface";
import axios from "axios";

const apiAuthSignIn = async ({
  login,
  password,
}: {
  login: IUser["login"];
  password: IUser["password"];
}): Promise<IResp<null>> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signIn`,
      {
        login,
        password,
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

export default apiAuthSignIn;
