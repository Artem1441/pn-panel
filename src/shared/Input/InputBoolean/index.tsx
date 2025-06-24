import { FC, JSX, memo } from "react";
import styles from "./InputBoolean.module.scss";

interface IProps {
  placeholder: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: { label: string; value: string }[];
}

const InputBoolean: FC<IProps> = memo(
  ({ placeholder, value, onChange }): JSX.Element => {
    return (
      <div className={styles.inputBoolean}>
        <label>
          <input type="checkbox" checked={Boolean(value)} onChange={onChange} />
          {placeholder && <span>{placeholder}</span>}
        </label>
      </div>
    );
  }
);

export default InputBoolean;
