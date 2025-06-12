import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiAuthRefuseEmployeeForm = async ({
  id,
  rejectionReason,
}: {
  id: number;
  rejectionReason: string;
}): Promise<IResp<null>> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refuseEmployeeForm`,
      {
        id,
        rejectionReason,
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

export default apiAuthRefuseEmployeeForm;
