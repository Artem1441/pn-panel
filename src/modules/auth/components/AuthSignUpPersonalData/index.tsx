// import {
//   apiAuthSignUpConfirmCode,
//   apiAuthSignUpUpdatePhoto,
//   // apiAuthSignUpUpdatePassportMain,
//   // apiAuthSignUpUpdatePassportRegistration,
//   // apiAuthSignUpUpdatePhotoFront,
// } from "@/api/auth.api";
import apiAuthSignUpCheckPersonalData from "@/api/auth/apiAuthSignUpCheckPersonalData.api";
import apiAuthSignUpUpdatePhoto from "@/api/auth/apiAuthSignUpUpdatePhoto.api";
import Camera from "@/components/Camera";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Input from "@/shared/Input";
import Portal from "@/shared/Portal";
import { authSlice } from "@/store/reducers/auth.reducer";
import checkPersonalData from "@/utils/checkPersonalData";
import cleanPhone from "@/utils/cleanPhone";
import { useState } from "react";

type PhotoType = "passport_main" | "passport_registration" | "photo_front" | "";

const AuthSignUpPersonalData = () => {
  const dispatch = useAppDispatch();
  const {
    setAuthPassportSeriesAction,
    setAuthPassportNumberAction,
    setAuthIssueDateAction,
    setAuthIssuedByAction,
    setAuthBirthdateAction,
    setAuthNationalityAction,
    setAuthRegistrationAddressAction,
    setAuthResidentialAddressAction,
    setAuthBankAccAction,
    setAuthBankBikAction,
    setAuthPassportMainAction,
    setAuthPassportRegistrationAction,
    setAuthPhotoFrontAction,
    setAuthStageAction,
    setAuthErrorAction,
  } = authSlice.actions;

  const {
    passport_main,
    passport_registration,
    photo_front,
    passport,
    bank_acc,
    bank_bik,
    error,
  } = useAppSelector((state) => state.authReducer);

  const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);
  const [photoType, setPhotoType] = useState<PhotoType>("");

  const setCamera = (name: PhotoType) => {
    setPhotoType(name);
    if (name !== "") setIsOpenCamera(true);
    else setIsOpenCamera(false);
  };

  const setAuthPassportMainPhoto = async (fileKey: string) => {
    dispatch(setAuthPassportMainAction(fileKey));
    const res = await apiAuthSignUpUpdatePhoto({
      fileKey,
      field: "passport_main",
    });
    console.log(res);
  };

  const setAuthPassportRegistrationPhoto = async (fileKey: string) => {
    dispatch(setAuthPassportRegistrationAction(fileKey));
    const res = await apiAuthSignUpUpdatePhoto({
      fileKey,
      field: "passport_registration",
    });
    console.log(res);
  };

  const setAuthPassportFrontPhoto = async (fileKey: string) => {
    dispatch(setAuthPhotoFrontAction(fileKey));
    const res = await apiAuthSignUpUpdatePhoto({
      fileKey,
      field: "photo_front",
    });
    console.log(res);
  };

  const checkSignUpPersonalData = async () => {
    const isCorrectData = checkPersonalData({
      passport,
      bank_bik,
      bank_acc,
      passport_main,
      passport_registration,
      photo_front,
    });

    if (!isCorrectData.status) {
      return dispatch(setAuthErrorAction(isCorrectData.error || ""));
    }

    const res = await apiAuthSignUpCheckPersonalData({
      passport,
      bank_bik,
      bank_acc,
      passport_main,
      passport_registration,
      photo_front
    });


    if (res.status) {
      dispatch(setAuthErrorAction(""));
      return dispatch(setAuthStageAction("waiting room"));
    } else return dispatch(setAuthErrorAction(res.error || ""));
  };
  return (
    <>
      {isOpenCamera && (
        <Portal>
          <Camera
            action={
              photoType === "passport_main"
                ? setAuthPassportMainPhoto
                : photoType === "passport_registration"
                ? setAuthPassportRegistrationPhoto
                : photoType === "photo_front"
                ? setAuthPassportFrontPhoto
                : () => {}
            }
            close={() => setCamera("")}
          />
        </Portal>
      )}

      <p>Укажите паспортные данные</p>
      <Input
        placeholder="Серия"
        value={passport.passport_series}
        onChange={(e) => {
          dispatch(setAuthPassportSeriesAction(e.target.value));
        }}
      />
      <Input
        placeholder="Номер"
        value={passport.passport_number}
        onChange={(e) => dispatch(setAuthPassportNumberAction(e.target.value))}
      />
      <Input
        type="date"
        placeholder="Когда выдан"
        value={passport.issue_date}
        onChange={(e) => {
          dispatch(setAuthIssueDateAction(e.target.value));
        }}
      />

      <Input
        placeholder="Кем выдан"
        value={passport.issued_by}
        onChange={(e) => {
          dispatch(setAuthIssuedByAction(e.target.value));
        }}
      />

      <Input
        type="date"
        placeholder="Дата рождения"
        value={passport.birthdate}
        onChange={(e) => {
          dispatch(setAuthBirthdateAction(e.target.value));
        }}
      />

      <Input
        placeholder="Гражданство"
        value={passport.nationality}
        onChange={(e) => {
          dispatch(setAuthNationalityAction(e.target.value));
        }}
      />

      <Input
        placeholder="Адрес регистрации"
        value={passport.registration_address}
        onChange={(e) => {
          dispatch(setAuthRegistrationAddressAction(e.target.value));
        }}
      />

      <Input
        placeholder="Фактический адрес проживания"
        value={passport.residential_address}
        onChange={(e) => {
          dispatch(setAuthResidentialAddressAction(e.target.value));
        }}
      />

      <p>Укажите банковские данные</p>
      <Input
        placeholder="БИК"
        value={bank_bik}
        onChange={(e) => {
          dispatch(setAuthBankBikAction(e.target.value));
        }}
      />

      <Input
        placeholder="Название банка"
        value={bank_acc}
        onChange={(e) => {
          dispatch(setAuthBankAccAction(e.target.value));
        }}
      />

      <p>{error}</p>

      <div>
        {passport_main && (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/images/${passport_main}`}
            alt=""
            width={200}
          />
        )}
        <button onClick={() => setCamera("passport_main")}>
          основная страница паспорта
        </button>
      </div>
      <div>
        {passport_registration && (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/images/${passport_registration}`}
            alt=""
            width={200}
          />
        )}
        <button onClick={() => setCamera("passport_registration")}>
          страница паспорта с пропиской
        </button>
      </div>
      <div>
        {photo_front && (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/images/${photo_front}`}
            alt=""
            width={200}
          />
        )}
        <button onClick={() => setCamera("photo_front")}>
          личное фото (анфас) на светлом фоне
        </button>
      </div>

      <button onClick={checkSignUpPersonalData}>Дальше</button>
    </>
  );
};

export default AuthSignUpPersonalData;
