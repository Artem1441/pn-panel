import errors from "@/constants/errors";
import IPersonalData from "@/types/IPersonalData.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiAuthSignUpCheckPersonalData = async ({
  passport,
  bank_bik,
  bank_acc,
  passport_main,
  passport_registration,
  photo_front,
}: IPersonalData): Promise<IResp<null>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp/checkPersonalData`,
      {
        passport,
        bank_bik,
        bank_acc,
        passport_main,
        passport_registration,
        photo_front,
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

export default apiAuthSignUpCheckPersonalData;
