import { FC, JSX, memo, useState } from "react";
import styles from "./InputPassword.module.scss";
// import eyeIcon from "@/assets/icons/eye.svg";
// import eyeOffIcon from "@/assets/icons/eye_off.svg";
// import Image from "next/image";

interface IInputPasswordProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: FC<IInputPasswordProps> = memo(
  ({ placeholder, value, onChange }): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={styles.inputPassword_container}>
        <input
          className={styles.inputPassword}
          type={showPassword ? "text" : "password"}
          autoCapitalize="none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.inputPassword_icon}
        >
          {showPassword ? (
            // <Image src={eyeIcon.src} alt="eye" width={20} height={20} />
            <>Unshow</>
          ) : (
            // <Image src={eyeOffIcon.src} alt="eyeOff" width={20} height={20} />
            <>Show</>
          )}
        </div>
      </div>
    );
  }
);

export default InputPassword;
