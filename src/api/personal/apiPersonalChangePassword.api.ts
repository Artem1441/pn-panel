import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IUser from "@/types/IUser.interface";
import axios from "axios";

const apiPersonalChangePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: IUser["password"];
  newPassword: IUser["password"];
}): Promise<IResp<null>> => {
  try {
    const response = await axios.post<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/personal/changePassword`,
      {
        currentPassword,
        newPassword,
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

export default apiPersonalChangePassword;
