import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IPrice from "@/types/IPrice.interface";
import axios from "axios";

const apiPriceDeletePrice = async ({
  id
}: {
  id: IPrice["id"]
}): Promise<IResp<null>> => {
  try {
    const response = await axios.delete<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/price/deletePrice`,
      {
        params: { id },
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

export default apiPriceDeletePrice;
