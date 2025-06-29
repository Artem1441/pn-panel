import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import ISpeciality from "@/types/ISpeciality.interface";
import axios from "axios";

const apiSpecialityCreateSpeciality = async ({
  name,
}: {
  name: ISpeciality["name"];
}): Promise<IResp<null>> => {
  try {
    const response = await axios.post<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/speciality/createSpeciality`,
      {
        name,
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

export default apiSpecialityCreateSpeciality;
