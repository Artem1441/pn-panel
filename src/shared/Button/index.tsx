import { FC, JSX, memo, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: FC<IProps> = memo(
  ({ children, onClick, className }): JSX.Element => {
    return (
      <button
        className={`button${className ? ` ${className}` : ``}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
