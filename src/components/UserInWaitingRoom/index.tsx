import apiAuthConfirmEmployeeForm from "@/api/auth/apiAuthConfirmEmployeeForm.api";
import apiAuthRefuseEmployeeForm from "@/api/auth/apiAuthRefuseEmployeeForm.api";
import apiNotificationAdminGetAll from "@/api/notification/apiNotificationAdminGetAll.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Image from "@/shared/Image";
import Input from "@/shared/Input";
import { notificationSlice } from "@/store/reducers/notification.reducer";
import IUser from "@/types/IUser.interface";
import getImageUrl from "@/utils/getImageUrl";
import { FC, JSX, useState } from "react";
import Alert from "../Alert";
import Dialog from "../Dialog";
import styles from "./UserInWaitingRoom.module.scss";

interface IProps {
  user: IUser;
}

const UserInWaitingRoom: FC<IProps> = ({ user }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setAdminNotificationsAction } = notificationSlice.actions;
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>("");

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
    const res = await apiAuthConfirmEmployeeForm({ id: user.id });

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
      setIsShowDialog(false);
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

      <button onClick={confirm}>Подтвердить</button>
      <button onClick={() => setIsShowDialog(true)}>
        Отправить на переподтверждение
      </button>

      {isShowDialog && (
        <Dialog closeAction={() => setIsShowDialog(false)}>
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
