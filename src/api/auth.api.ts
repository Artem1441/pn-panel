import IIdentificationData from "@/types/IIdentificationData.interface";
import IResp from "@/types/IResp.interface";
import StageType from "@/types/StageType.type";
import axios from "axios";

export const apiAuthSignUpStage = async (): Promise<IResp<StageType>> => {
  try {
    const response = await axios.get<IResp<StageType>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp/stage`,
      {
        withCredentials: true,
      }
    );

    if (response.data.status) {
      return response.data;
    } else {
      return {
        status: false,
        error: response.data.error || "Unknown Error",
      };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: false,
        error: err.response?.data?.error || "Network error",
      };
    } else {
      return {
        status: false,
        error: "Unexpected error occurred",
      };
    }
  }
};

export const apiAuthSignUpCreateUser = async ({
  name,
  surname,
  patronymic,
  phone,
  email,
  inn,
}: IIdentificationData): Promise<IResp<null>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp/createUser`,
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
        error: response.data.error || "Unknown Error",
      };
    }
  } catch (err) {
    console.log(err);
    // return {
    //   status: false,
    //   error: "Произошла ошибка 2",
    // };
    if (axios.isAxiosError(err)) {
      return {
        status: false,
        error: err.response?.data?.error || "Network error",
      };
    } else {
      return {
        status: false,
        error: "Unexpected error occurred",
      };
    }
  }
};

// export const apiAuthSignUpUpdateFullName = async ({
//   name,
//   surname,
//   patronymic,
// }: {
//   name: string;
//   surname: string;
//   patronymic: string;
// }) => {
//   try {
//     await axios.post(
//       "http://localhost:8080/api/auth/signUp/updateFullName",
//       {
//         name,
//         surname,
//         patronymic,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     return { status: true };
//   } catch (err: any) {
//     return {
//       status: false,
//       message: err.response.data.error,
//     };
//   }
// };

// export const apiAuthSignUpUpdatePhone = async ({
//   phone,
// }: {
//   phone: string;
// }) => {
//   try {
//     await axios.post(
//       "http://localhost:8080/api/auth/signUp/updatePhone",
//       {
//         phone,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     return { status: true };
//   } catch (err: any) {
//     return {
//       status: false,
//       message: err.response.data.error,
//     };
//   }
// };

// export const apiAuthSignUpUpdateEmail = async ({
//   email,
// }: {
//   email: string;
// }) => {
//   try {
//     await axios.post(
//       "http://localhost:8080/api/auth/signUp/updateEmail",
//       {
//         email,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     return { status: true };
//   } catch (err: any) {
//     return {
//       status: false,
//       message: err.response.data.error,
//     };
//   }
// };

export const apiAuthSignUpConfirmCode = async ({
  type,
  value,
  code,
}: {
  type: "phone" | "email";
  value: string;
  code: string;
}): Promise<IResp<null>> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signUp/confirmCode`,
      {
        type,
        value,
        code,
      },
      {
        withCredentials: true,
      }
    );

    return { status: true };
  } catch (err: any) {
    return {
      status: false,
      error: err.response.data.error,
    };
  }
};
