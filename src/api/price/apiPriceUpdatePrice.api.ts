import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IPrice from "@/types/IPrice.interface";
import axios from "axios";

const apiPriceUpdatePrice = async ({
  id,
  city_id,
  self_employed_data,
  clients_mani_data,
  clients_pedi_data,
  clients_mani_pedi_four_hands_data,
  clients_design_data,
  clients_additional_nail_services_data,
  clients_brow_arch_data,
  clients_promo_data,
  clients_model_data,
  clients_goods_data,
}: {
  id: IPrice["id"]
  city_id: IPrice["city_id"];
  self_employed_data: IPrice["self_employed_data"];
  clients_mani_data: IPrice["clients_mani_data"];
  clients_pedi_data: IPrice["clients_pedi_data"];
  clients_mani_pedi_four_hands_data: IPrice["clients_mani_pedi_four_hands_data"];
  clients_design_data: IPrice["clients_design_data"];
  clients_additional_nail_services_data: IPrice["clients_additional_nail_services_data"];
  clients_brow_arch_data: IPrice["clients_brow_arch_data"];
  clients_promo_data: IPrice["clients_promo_data"];
  clients_model_data: IPrice["clients_model_data"];
  clients_goods_data: IPrice["clients_goods_data"]
}): Promise<IResp<null>> => {
  try {
    const response = await axios.put<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/price/updatePrice`,
      {
        id,
        city_id,
        self_employed_data,
        clients_mani_data,
        clients_pedi_data,
        clients_mani_pedi_four_hands_data,
        clients_design_data,
        clients_additional_nail_services_data,
        clients_brow_arch_data,
        clients_promo_data,
        clients_model_data,
        clients_goods_data,
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

export default apiPriceUpdatePrice;
