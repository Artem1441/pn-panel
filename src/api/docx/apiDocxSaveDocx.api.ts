import errors from "@/constants/errors";
import IDocx from "@/types/IDocx.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiDocxSaveDocx = async ({
  file_key,
  file_type
}: {
  file_key: IDocx["file_key"]
  file_type: IDocx["file_key"];
}): Promise<IResp<null>> => {
  try {
    const response = await axios.put<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docx/saveDocx`,
      {
        file_key,
        file_type
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

export default apiDocxSaveDocx;
