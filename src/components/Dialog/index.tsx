import { FC, JSX, memo } from "react";
import Portal from "../Portal";
import styles from "./Dialog.module.scss";

interface IProps {
  children: React.ReactNode;
  closeAction: () => void;
}

const Dialog: FC<IProps> = memo(({ children, closeAction }): JSX.Element => {
  return (
    <>
      <Portal>
        <style global jsx>{`
          html {
            overflow: hidden;
          }
        `}</style>
        <div className={styles.dialog} onClick={closeAction}>
          <div className={styles.dialog_content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </Portal>
    </>
  );
});

export default Dialog;
