import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IUser from "@/types/IUser.interface";
// import IUser from "@/types/IUser.interface";
import axios from "axios";

const apiNotificationSettingsGetAll = async (): Promise<
  IResp<any>
> => {
  try {
    const response = await axios.get<IResp<any>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/settings/getAll`,
      {
        withCredentials: true,
      }
    );

    console.log(response);

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

export default apiNotificationSettingsGetAll;
