import { FC, JSX, memo, useRef } from "react";
import styles from "./InputFile.module.scss";
import apiCloudUploadFile from "@/api/cloud/apiCloudUploadFile.api";
import UploadFileType from "@/types/UploadFileType.type";
import Alert  from "@/components/Alert";
import constants from "@/constants/constants";

interface IProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: UploadFileType[];
  maxSizeMb?: number;
}

const EXTENSION_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

const InputFile: FC<IProps> = memo(
  ({
    placeholder,
    onChange,
    accept = ["jpg", "jpeg", "pdf", "png"],
    maxSizeMb = constants.defaultMaxFileSizeMb,
  }): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);

    const acceptedMimeTypes = accept
      .map((ext) => EXTENSION_TO_MIME[ext.toLowerCase()])
      .filter(Boolean);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!acceptedMimeTypes.includes(file.type)) {
        Alert.show({
          title: `Файл с расширением "${file.name
            .split(".")
            .pop()}" не поддерживается.`,
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      const maxBytes = maxSizeMb * 1024 * 1024;
      if (file.size > maxBytes) {
        Alert.show({
          title: `Файл слишком большой. Максимальный размер: ${maxSizeMb}MB`,
          icon: "error",
        });
        e.target.value = "";
        return;
      }

      try {
        const response = await apiCloudUploadFile(file);
        if (response.status)
          onChange({ target: { value: response.data || "" } } as any);
        else console.error("Ошибка загрузки файла:", response.error);
      } catch (err) {
        console.error("Непредвиденная ошибка загрузки:", err);
      }
    };

    return (
      <label className={styles.inputFile_label}>
        {placeholder}
        <input
          ref={inputRef}
          type="file"
          className={styles.inputFile_input}
          onChange={handleFileChange}
          accept={acceptedMimeTypes.join(",")}
        />
      </label>
    );
  }
);

export default InputFile;
