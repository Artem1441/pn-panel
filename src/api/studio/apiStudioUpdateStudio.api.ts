import errors from "@/constants/errors";
import IResp from "@/types/IResp.interface";
import IStudio from "@/types/IStudio.interface";
import axios from "axios";

const apiStudioUpdateStudio = async ({
  id,
  city_id,
  name,
  general_full_address,
  general_area,
  general_cadastral_number,
  general_contract_number,
  general_contract_date,
  general_registration,
  general_rent_price_per_sqm,
  general_owner_last_name,
  general_owner_first_name,
  general_owner_middle_name,
  general_owner_phone,
  general_owner_email,
  general_coowner_available,
  general_coowner_last_name,
  general_coowner_first_name,
  general_coowner_middle_name,
  general_coowner_phone,
  general_coowner_email,
  general_work_schedule,
  general_work_schedule_weekdays,
  general_work_schedule_weekends,
  general_wifi_password,
  general_alarm_code,
  general_lock_code,
  general_services_mani,
  general_services_pedi,
  general_services_brows,
  general_sublease_available,
  general_sublease_area,
  general_sublease_activity_type,
  general_sublease_rent_price_per_sqm,
  general_sublease_contact_last_name,
  general_sublease_contact_first_name,
  general_sublease_contact_middle_name,
  general_sublease_contact_phone,
  general_sublease_contact_email,
}: {
  id: IStudio["id"];
  city_id: IStudio["city_id"];
  name: IStudio["name"];
  general_full_address: IStudio["general_full_address"];
  general_area: IStudio["general_area"];
  general_cadastral_number: IStudio["general_cadastral_number"];
  general_contract_number: IStudio["general_contract_number"];
  general_contract_date: IStudio["general_contract_date"];
  general_registration: IStudio["general_registration"];
  general_rent_price_per_sqm: IStudio["general_rent_price_per_sqm"];
  general_owner_last_name: IStudio["general_owner_last_name"];
  general_owner_first_name: IStudio["general_owner_first_name"];
  general_owner_middle_name: IStudio["general_owner_middle_name"];
  general_owner_phone: IStudio["general_owner_phone"];
  general_owner_email: IStudio["general_owner_email"];
  general_coowner_available: IStudio["general_coowner_available"];
  general_coowner_last_name: IStudio["general_coowner_last_name"];
  general_coowner_first_name: IStudio["general_coowner_first_name"];
  general_coowner_middle_name: IStudio["general_coowner_middle_name"];
  general_coowner_phone: IStudio["general_coowner_phone"];
  general_coowner_email: IStudio["general_coowner_email"];
  general_work_schedule: IStudio["general_work_schedule"];
  general_work_schedule_weekdays: IStudio["general_work_schedule_weekdays"];
  general_work_schedule_weekends: IStudio["general_work_schedule_weekends"];
  general_wifi_password: IStudio["general_wifi_password"];
  general_alarm_code: IStudio["general_alarm_code"];
  general_lock_code: IStudio["general_lock_code"];
  general_services_mani: IStudio["general_services_mani"];
  general_services_pedi: IStudio["general_services_pedi"];
  general_services_brows: IStudio["general_services_brows"];
  general_sublease_available: IStudio["general_sublease_available"];
  general_sublease_area: IStudio["general_sublease_area"];
  general_sublease_activity_type: IStudio["general_sublease_activity_type"];
  general_sublease_rent_price_per_sqm: IStudio["general_sublease_rent_price_per_sqm"];
  general_sublease_contact_last_name: IStudio["general_sublease_contact_last_name"];
  general_sublease_contact_first_name: IStudio["general_sublease_contact_first_name"];
  general_sublease_contact_middle_name: IStudio["general_sublease_contact_middle_name"];
  general_sublease_contact_phone: IStudio["general_sublease_contact_phone"];
  general_sublease_contact_email: IStudio["general_sublease_contact_email"];
}): Promise<IResp<null>> => {
  try {
    const response = await axios.put<IResp<null>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/studio/updateStudio`,
      {
        id,
        city_id,
        name,
        general_full_address,
        general_area,
        general_cadastral_number,
        general_contract_number,
        general_contract_date,
        general_registration,
        general_rent_price_per_sqm,
        general_owner_last_name,
        general_owner_first_name,
        general_owner_middle_name,
        general_owner_phone,
        general_owner_email,
        general_coowner_available,
        general_coowner_last_name,
        general_coowner_first_name,
        general_coowner_middle_name,
        general_coowner_phone,
        general_coowner_email,
        general_work_schedule,
        general_work_schedule_weekdays,
        general_work_schedule_weekends,
        general_wifi_password,
        general_alarm_code,
        general_lock_code,
        general_services_mani,
        general_services_pedi,
        general_services_brows,
        general_sublease_available,
        general_sublease_area,
        general_sublease_activity_type,
        general_sublease_rent_price_per_sqm,
        general_sublease_contact_last_name,
        general_sublease_contact_first_name,
        general_sublease_contact_middle_name,
        general_sublease_contact_phone,
        general_sublease_contact_email,
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

export default apiStudioUpdateStudio;
