// specialties.ts
import axios from "axios";
// import {
//   API_SPECIALTIES_DELETE,
//   API_SPECIALTIES_GET_LIST,
//   API_SPECIALTIES_GET_OBJECT,
//   API_SPECIALTIES_INSERT,
//   API_SPECIALTIES_UPDATE,
// } from "../utils/constants";

interface IRes {
  status: boolean;
  data?: any;
  message?: string;
}

export const apiGetSignUpStage = async () => {
  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === "token") {
        // Предположим, что токен хранится в куки с именем 'token'
        return value;
      }
    }
    return null; // Если токен не найден
  };

  // Пример использования
  const token = getTokenFromCookies();

  console.log("Here");
  const response = await axios.get(
    "http://localhost:8080/api/users/getSignUpStage",
    {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
      withCredentials: true,
    }
  );

  return {
    status: true,
    data: response.data,
  };
};

export const apiSignUpFullName = async ({
  name,
  surname,
  patronymic,
}: any): Promise<IRes> => {
  try {
    // const url = `${API_SPECIALTIES_GET_LIST}`;
    const url = "http://localhost:8080/api/users/signUpFullName";
    const response = await axios.post(
      url,
      {
        name,
        surname,
        patronymic,
      },
      { withCredentials: true }
    );

    console.log(response);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return { status: false, message: "При запросе что-то пошло не так" };
  }
};

export const sendIdentificationData = async ({
  name,
  surname,
  patronymic,
  inn,
  phone,
  email,
}: any): Promise<IRes> => {
  try {
    // const url = `${API_SPECIALTIES_GET_LIST}`;
    const url = "http://localhost:8080/api/users/sendIdentificationData";
    const response = await axios.post(url, {
      name,
      surname,
      patronymic,
      inn,
      phone,
      email,
    });
    console.log(response);
    // const models = response.data.models;

    // if (models.Response.rows[0].result !== 0) {
    //   throw new Error(models.Response.rows[0].descr);
    // }

    return {
      status: true,
      data: response,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return { status: false, data: null, message: "Ошибка" };
  }
};

// export const specialtiesGetObject = async ({ id }): Promise<IRes> => {
//   try {
//     const url = `${API_SPECIALTIES_GET_OBJECT}&id=${id}`;
//     const response = await axios.get(url);
//     const models = response.data.models;

//     if (models.Response.rows[0].result !== 0) {
//       throw new Error(models.Response.rows[0].descr);
//     }

//     return {
//       status: true,
//       data: models.SpecialityDialog_Model.rows[0],
//       message: "",
//     };
//   } catch (error) {
//     return { status: false, data: null, message: error.message };
//   }
// };

// export const specialtiesInsert = async ({
//   name,
//   agent_percent,
//   equipments,
// }): Promise<IRes> => {
//   try {
//     const url = `${API_SPECIALTIES_INSERT}&name=${name}&agent_percent=${agent_percent}&equipments=${JSON.stringify(
//       equipments
//     )}`;
//     const response = await axios.get(url);
//     const models = response.data.models;

//     if (models.Response.rows[0].result !== 0) {
//       throw new Error(models.Response.rows[0].descr);
//     }
//     return { status: true, data: null, message: "" };
//   } catch (error) {
//     return { status: false, data: null, message: error.message };
//   }
// };

// export const specialtiesUpdate = async ({
//   old_id,
//   name,
//   agent_percent,
//   equipments,
// }): Promise<IRes> => {
//   try {
//     const url = `${API_SPECIALTIES_UPDATE}&old_id=${old_id}&name=${name}&agent_percent=${agent_percent}&equipments=${JSON.stringify(
//       equipments
//     )}`;
//     const response = await axios.get(url);
//     const models = response.data.models;

//     if (models.Response.rows[0].result !== 0) {
//       throw new Error(models.Response.rows[0].descr);
//     }
//     return { status: true, data: null, message: "" };
//   } catch (error) {
//     return { status: false, data: null, message: error.message };
//   }
// };

// export const specialtiesDelete = async ({ id }): Promise<IRes> => {
//   try {
//     const url = `${API_SPECIALTIES_DELETE}&id=${id}`;
//     const response = await axios.get(url);
//     const models = response.data.models;

//     if (models.Response.rows[0].result !== 0) {
//       throw new Error(models.Response.rows[0].descr);
//     }
//     return { status: true, data: null, message: "" };
//   } catch (error) {
//     return { status: false, data: null, message: error.message };
//   }
// };
