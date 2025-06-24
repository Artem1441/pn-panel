import { FC, JSX, memo } from "react";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";
import styles from "./Input.module.scss";
import InputTextarea from "./InputTextarea";
import InputFile from "./InputFile";
import UploadFileType from "@/types/UploadFileType.type";
import InputSelect from "./InputSelect";
import InputBoolean from "./InputBoolean";

interface IProps {
  type?:
    | "date"
    | "number"
    | "phone"
    | "password"
    | "textarea"
    | "file"
    | "select"
    | "boolean";
  placeholder: string;
  value: string | boolean;
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
    if (typeof value === "boolean") {
      if (type === "boolean") {
        return (
          <InputBoolean
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        );
      }
      return <></>;
    }

    if (type === "textarea") {
      return (
        <InputTextarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "password") {
      return (
        <InputPassword
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "phone") {
      return (
        <InputPhone
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "file") {
      return (
        <InputFile
          placeholder={placeholder}
          onChange={onChange}
          accept={accept}
          maxSizeMb={maxSizeMb}
        />
      );
    } else if (type === "select") {
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
