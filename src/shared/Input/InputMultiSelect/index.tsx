import { FC, memo } from "react";
import styles from "./InputMultiSelect.module.scss";

interface Props {
  value: string[];
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputMultiSelect: FC<Props> = memo(
  ({ value, placeholder, options, onChange }) => {
    const handleMouseDown = (e: React.MouseEvent<HTMLSelectElement>) => {
      e.preventDefault();

      const target = e.target as HTMLOptionElement;
      if (target.tagName !== "OPTION") return;

      const selectedValue = target.value;

      const currentSelected = Array.from(
        target.parentNode!.querySelectorAll("option:checked"),
        (opt) => (opt as HTMLOptionElement).value
      );

      const newSelected = currentSelected.includes(selectedValue)
        ? currentSelected.filter((v) => v !== selectedValue)
        : [...currentSelected, selectedValue];

      const fakeEvent = {
        target: {
          value: newSelected,
          selectedOptions: newSelected.map((val) => ({
            value: val,
          })),
        },
        currentTarget: {
          value: newSelected,
          selectedOptions: newSelected.map((val) => ({
            value: val,
          })),
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange(fakeEvent);
    };

    return (
      <select
        title={placeholder}
        className={styles.input}
        multiple
        value={value}
        onMouseDown={handleMouseDown}
      >
        {options.length === 0 ? (
          <option disabled>{placeholder}</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
    );
  }
);

export default InputMultiSelect;
