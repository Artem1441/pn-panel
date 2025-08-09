import apiPaymentsUploadCheckPhoto from "@/api/payments/apiPaymentsUploadCheckPhoto.api"
import apiPaymentsUploadCheckUrl from "@/api/payments/apiPaymentsUploadCheckUrl.api"
import Alert from "@/components/Alert"
import Image from "@/shared/Image"
import Input from "@/shared/Input"
import getImageUrl from "@/utils/getImageUrl"
import { FC, JSX, useState } from "react"

const Payments: FC = (): JSX.Element => {
  const [linkUrl, setLinkUrl] = useState<string>("")
  const [linkSrc, setLinkSrc] = useState<string>("")

  const uploadCheck = async () => {
    if (linkUrl.length) {
      const res = await apiPaymentsUploadCheckUrl({ url: linkUrl })
      console.log(res)
    } else if (linkSrc.length) {
      const res = await apiPaymentsUploadCheckPhoto({
        fileKey: linkSrc
      })
      console.log(res)
    } else {
      Alert.show({
        title: "Введите url или загрузите фото с QR-кодом платежа",
        icon: "error",
      })
    }
  }

  return (
    <>
      <div>
        <p>Введите ссылку на платёж</p>
        <Input
          placeholder="https://lknpd.nalog.ru/api/v1/receipt/ваш_инн/хеш_чека/print"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
      </div>

      <div>
        <p>Или скрин чека из приложения</p>

        <Image src={`${getImageUrl(linkSrc)}`} width={200} />
        <Input
          type="file"
          placeholder="Картинка"
          value={linkSrc}
          onChange={(e) => setLinkSrc(e.target.value)}
          accept={["jpg", "jpeg", "png"]}
        />
      </div>

      <button onClick={uploadCheck}>Загрузить в систему</button>
    </>
  )
}

export default Payments
