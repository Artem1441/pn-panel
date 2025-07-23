import errors from "@/constants/errors";
import IDocx from "@/types/IDocx.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiDocxTestDocx = async ({
  file_type
}: {
  file_type: IDocx["file_key"];
}): Promise<IResp<string>> => {
  try {
    const response = await axios.post<IResp<string>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docx/testDocx`,
      {
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

export default apiDocxTestDocx;
