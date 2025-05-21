import errors from "@/constants/errors";
import IIdentificationData from "@/types/IIdentificationData.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiAuthSignUpCheckIdentificationData = async ({
    name,
    surname,
    patronymic,
    phone,
    email,
    inn,
  }: IIdentificationData): Promise<IResp<null>> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp/checkIdentificationData`,
        { name, surname, patronymic, phone, email, inn },
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

  export default apiAuthSignUpCheckIdentificationData