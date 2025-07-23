import errors from "@/constants/errors";
import IDocx from "@/types/IDocx.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiDocxDeleteDocx = async ({
  id
}: {
  id: IDocx["id"]
}): Promise<IResp<null>> => {
  try {
    const response = await axios.delete<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docx/deleteDocx`,
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

export default apiDocxDeleteDocx;
