import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import ISpeciality from "@/types/ISpeciality.interface";
import axios from "axios";

const apiSpecialityGetSpecialities = async (): Promise<
  IResp<ISpeciality[]>
> => {
  try {
    const response = await axios.get<IResp<ISpeciality[]>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/speciality/getSpecialities`,
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

export default apiSpecialityGetSpecialities;
