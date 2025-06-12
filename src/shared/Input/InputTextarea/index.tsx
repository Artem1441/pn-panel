import { FC, JSX, memo } from "react";

interface IProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextarea: FC<IProps> = memo(
  ({ value, placeholder, onChange }): JSX.Element => {
    return (
      <textarea value={value} placeholder={placeholder} onChange={onChange} />
    );
  }
);

export default InputTextarea;
