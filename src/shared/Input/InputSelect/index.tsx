import { FC, memo } from "react";
import styles from "./InputSelect.module.scss";

interface IProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
}

const InputSelect: FC<IProps> = memo(
  ({ placeholder, value, onChange, options }) => {
    return (
      <select
        title={placeholder}
        className={`${styles.inputSelect} ${
          !value ? styles.placeholderActive : ""
        }`}
        value={value}
        onChange={onChange}
      >
        {!value && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

export default InputSelect;
