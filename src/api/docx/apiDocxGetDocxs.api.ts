import errors from "@/constants/errors";
import DocumentType from "@/types/DocumentType.type";
import IDocx from "@/types/IDocx.interface";
import IResp from "@/types/IResp.interface";
import axios from "axios";

const apiDocxGetDocxs = async (): Promise<
  IResp<Partial<Record<DocumentType, IDocx>>>
> => {
  try {
    const response = await axios.get<
      IResp<Partial<Record<DocumentType, IDocx>>>
    >(`${process.env.NEXT_PUBLIC_BACKEND_URL}/docx/getDocxs`, {
      withCredentials: true,
    });

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

export default apiDocxGetDocxs;
