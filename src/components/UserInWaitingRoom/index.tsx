import apiAuthConfirmEmployeeForm from "@/api/auth/apiAuthConfirmEmployeeForm.api";
import apiAuthGetSpecialitiesAndStudios from "@/api/auth/apiAuthGetSpecialitiesAndStudios.api";
import apiAuthRefuseEmployeeForm from "@/api/auth/apiAuthRefuseEmployeeForm.api";
import apiNotificationAdminGetAll from "@/api/notification/apiNotificationAdminGetAll.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Image from "@/shared/Image";
import Input from "@/shared/Input";
import InputMultiSelectCustom from "@/shared/Input/InputMultiSelect";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import ISpeciality from "@/types/ISpeciality.interface";
import IStudio from "@/types/IStudio.interface";
import IUser from "@/types/IUser.interface";
import getImageUrl from "@/utils/getImageUrl";
import { FC, JSX, useEffect, useState } from "react";
import Alert from "../Alert";
import Dialog from "../Dialog";
import styles from "./UserInWaitingRoom.module.scss";

interface IProps {
  user: IUser;
}

const UserInWaitingRoom: FC<IProps> = ({ user }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [specialityIdAndStudiosIds, setSpecialityIdAndStudiosIds] = useState<{
    speciality_id: null | ISpeciality["id"];
    studio_ids: IStudio["id"][];
  }>({ speciality_id: null, studio_ids: [] });
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const [studios, setStudios] = useState<IStudio[]>([]);
  const { setAdminNotificationsAction } = notificationSlice.actions;
  const [isShowConfirmationDialog, setIsShowConfirmationDialog] =
    useState<boolean>(false);
  const [isShowRejectDialog, setIsShowRejectDialog] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const getSpecialitiesAndStudios = async () => {
    const res = await apiAuthGetSpecialitiesAndStudios();
    if (res.status && res.data) {
      setSpecialities(res.data?.specialities);
      setStudios(res.data?.studios);
    }
  };

  const refreshNotificationAdminGetAll = async () => {
    const res = await apiNotificationAdminGetAll();
    if (!res.status)
      return Alert.show({
        title: "Что-то не так",
        icon: "error",
      });
    dispatch(
      setAdminNotificationsAction(res.data || { usersInWaitingRoom: [] })
    );
  };

  const confirm = async () => {
    if (!specialityIdAndStudiosIds.speciality_id) {
      return Alert.show({
        title: "Выберите специальность мастеру",
        icon: "error",
      });
    } else if (!specialityIdAndStudiosIds.studio_ids.length) {
      return Alert.show({
        title: "Выберите студии для мастера",
        icon: "error",
      });
    }

    const res = await apiAuthConfirmEmployeeForm({
      id: user.id,
      speciality_id: specialityIdAndStudiosIds.speciality_id,
      studio_ids: specialityIdAndStudiosIds.studio_ids,
    });

    if (res.status) {
      Alert.show({
        title: "Пользователю предоставлен доступ",
        icon: "success",
      });
      await refreshNotificationAdminGetAll();
    } else {
      Alert.show({
        title: "Ошибка",
        text: res.error,
        icon: "error",
      });
    }
    console.log(res);
  };

  const refuse = async () => {
    if (rejectionReason.length === 0) {
      return Alert.show({
        title: "Укажите причину отказа",
        icon: "error",
      });
    }
    const res = await apiAuthRefuseEmployeeForm({
      id: user.id,
      rejectionReason,
    });
    if (res.status) {
      setIsShowRejectDialog(false);
      setRejectionReason("");
      Alert.show({
        title: "Анекта отклонена",
        icon: "success",
      });
      await refreshNotificationAdminGetAll();
    } else {
      Alert.show({
        title: "Ошибка",
        text: res.error,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (isShowConfirmationDialog) {
      getSpecialitiesAndStudios();
    } else {
      setSpecialities([]);
      setStudios([]);
    }
  }, [isShowConfirmationDialog]);

  return (
    <div className={styles.userInWaitingRoom}>
      <p>Имя: {user.name}</p>
      <p>Фамилия: {user.surname}</p>
      <p>Отчество: {user.patronymic}</p>
      <p>Телефон (подтверждён): {user.phone}</p>
      <p>Почта (подтверждёна): {user.email}</p>
      <p>ИНН: {user.inn}</p>
      <p>БИК: {user.bank_bik}</p>
      <p>Расчётный счёт: {user.bank_acc}</p>
      <p>Дата рождения: {user.passport?.birthdate}</p>
      <p>Выдано: {user.passport?.issued_by}</p>
      <p>Дата выдачи: {user.passport?.issue_date}</p>
      <p>Национальность: {user.passport?.nationality}</p>
      <p>Номер: {user.passport?.passport_number}</p>
      <p>Серия: {user.passport?.passport_series}</p>
      <p>Адрес проживания: {user.passport?.residential_address}</p>
      <p>Фактический адрес: {user.passport?.registration_address}</p>
      <Image src={getImageUrl(user.passport_main)} width={200} expandable />
      <Image
        src={getImageUrl(user.passport_registration)}
        width={200}
        expandable
      />
      <Image src={getImageUrl(user.photo_front)} width={200} expandable />

      <button onClick={() => setIsShowConfirmationDialog(true)}>
        Подтвердить
      </button>
      <button onClick={() => setIsShowRejectDialog(true)}>
        Отправить на переподтверждение
      </button>

      {isShowConfirmationDialog && (
        <Dialog closeAction={() => setIsShowConfirmationDialog(false)}>
          <Input
            type="select"
            placeholder="Выберите специальность"
            value={String(specialityIdAndStudiosIds.speciality_id || "")}
            onChange={(e) =>
              setSpecialityIdAndStudiosIds({
                ...specialityIdAndStudiosIds,
                speciality_id: Number(e.target.value),
              })
            }
            options={specialities.map((speciality: ISpeciality) => ({
              label: speciality.name,
              value: String(speciality.id),
            }))}
          />

          <Input
            type="multi-select"
            placeholder="Выберите студии"
            value={specialityIdAndStudiosIds.studio_ids.map(String)}
            onChange={(e) => {
              setSpecialityIdAndStudiosIds({
                ...specialityIdAndStudiosIds,
                studio_ids: (e.target.value as unknown as string[]).map(Number),
              });
            }}
            options={studios?.map((studio) => ({
              label: studio.name,
              value: String(studio.id),
            }))}
          />

          <button onClick={confirm}>Отправить</button>
        </Dialog>
      )}

      {isShowRejectDialog && (
        <Dialog closeAction={() => setIsShowRejectDialog(false)}>
          <Input
            placeholder="Опишите причину, почему не подошла анкета"
            type="textarea"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />

          <button onClick={refuse}>Отправить</button>
        </Dialog>
      )}
    </div>
  );
};

export default UserInWaitingRoom;
