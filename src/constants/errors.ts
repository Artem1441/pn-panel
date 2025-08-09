const errors = {
  unknown_error: "Unknown error",
  network_error: "Network error",
  unexpected_error: "Unexpected error occurred",

  name_and_surname_invalid: "Введите имя и фамилию",
  phone_invalid: "Введите полный номер телефона",
  email_invalid: "Некорректный формат email",
  inn_invalid: "ИНН должен состоять из 12 цифр",

  passport_series_invalid: "Серия паспорта должна состоять из 4 цифр",
  passport_number_invalid: "Номер паспорта должен состоять из 6 цифр",
  issue_date_invalid: "Дата выдачи указана некорректно",
  issued_by_invalid: "Не указано, кем выдан паспорт",
  birthday_invalid: "Дата рождения указана некорректно",
  nationality_invalid: "Гражданство должно быть Российской Федерацией",
  registration_address_invalid: "Адрес регистрации не указан",
  residential_address_invalid: "Фактический адрес проживания не указан",

  passport_main_required: "Фото основного разворота паспорта не загружено",
  passport_registration_required: "Фото страницы с регистрацией не загружено",
  photo_front_required: "Фото пользователя не загружено",

  bank_bik_required: "БИК должен состоять из 9 цифр",
  bank_acc_required: "Номер банковского счёта должен состоять из 20 цифр",

  password_mismatch: "Пароли должны совпадать",
  password_too_short: "Пароль должен содержать минимум 8 символов",

  all_fields_required: "Все поля обязательны к заполнению",

  studio_city_required: "У студии должен быть выбран город",
  price_city_required: "У цен должен быть выбран город",
  studio_short_name_required: "Краткое название студии не должно быть пустым",
  studio_date_invalid: "Дата указана некорректно",

  city_name_required: "Название города не должно быть пустым",
  city_code_required: "Код города не должен быть пустым",
  
  speciality_short_name_required:
    "Название специальности не должно быть пустым",
  termination_reasons_fields_required: "Все поля должны быть заполнены",
};

export default errors;
