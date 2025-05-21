import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import axios from "axios";

 const apiCloudUploadFile = async (
  file: File
): Promise<IResp<string>> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/uploadFile`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
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

export default apiCloudUploadFile