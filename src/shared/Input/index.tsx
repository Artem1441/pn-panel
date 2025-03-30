import { FC, JSX, memo } from "react";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";
import styles from "./Input.module.scss";

interface IProps {
  type?: "number" | "phone" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = memo(
  ({ type, value, placeholder, onChange }): JSX.Element => {
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

    return (
      <input
        className={styles.input}
        type={type === "number" ? "number" : "text"}
        autoCapitalize="none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default Input;