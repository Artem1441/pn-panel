import { FC, JSX, memo } from "react";
import ReactInputMask from "react-input-mask";
import styles from "./InputPhone.module.scss";

interface IProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPhone: FC<IProps> = memo(
  ({ value, placeholder, onChange }): JSX.Element => {
    const mask = "+7(999)-999-99-99";

    return (
      <ReactInputMask
        className={styles.inputPhone}
        type="tel"
        autoCapitalize="none"
        placeholder={placeholder}
        mask={mask}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default InputPhone;