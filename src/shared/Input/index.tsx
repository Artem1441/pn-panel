import { FC, JSX, memo } from "react";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";
import styles from "./Input.module.scss";
import InputTextarea from "./InputTextarea";
import InputFile from "./InputFile";
import UploadFileType from "@/types/UploadFileType.type";
import InputSelect from "./InputSelect";

interface IProps {
  type?:
    | "date"
    | "number"
    | "phone"
    | "password"
    | "textarea"
    | "file"
    | "select";
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  accept?: UploadFileType[];
  maxSizeMb?: number;
  options?: { label: string; value: string }[];
}

const Input: FC<IProps> = memo(
  ({
    type,
    value,
    placeholder,
    onChange,
    accept,
    maxSizeMb,
    options,
  }): JSX.Element => {
    if (type === "textarea") {
      return (
        <InputTextarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (type === "password") {
      return (
        <InputPassword
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    }

    if (type === "phone") {
      return (
        <InputPhone
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (type === "file") {
      return (
        <InputFile
          placeholder={placeholder}
          onChange={onChange}
          accept={accept}
          maxSizeMb={maxSizeMb}
        />
      );
    }

    if (type === "select") {
      return (
        <InputSelect
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
        />
      );
    }

    return (
      <input
        className={styles.input}
        type={type === "number" ? "number" : type === "date" ? "date" : "text"}
        autoCapitalize="none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default Input;
