import React from "react";
import ReactDOM from "react-dom/client";

import styles from "./Alert.module.scss";

interface AlertOptions {
  title: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  footer?: React.ReactNode;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface AlertResult {
  isConfirmed: boolean;
}

const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  question: "❓",
};

const Alert = {
  show(options: AlertOptions): Promise<AlertResult> {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return;

      const container = document.createElement("div");
      container.id = "custom-alert-portal";
      document.body.appendChild(container);

      const handleClose = () => {
        setTimeout(() => {
          ReactDOM.createRoot(container).unmount();
          document.body.removeChild(container);
        }, 100);
        resolve({ isConfirmed: true });
      };

      const handleCancel = () => {
        setTimeout(() => {
          ReactDOM.createRoot(container).unmount();
          document.body.removeChild(container);
        }, 100);
        resolve({ isConfirmed: false });
      };

      const mergedOptions = {
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        ...options,
      };

      const alertElement = (
        <CustomAlertContent
          {...mergedOptions}
          onConfirm={handleClose}
          onCancel={handleCancel}
        />
      );

      ReactDOM.createRoot(container).render(alertElement);
    });
  },
};

interface CustomAlertContentProps extends AlertOptions {
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
  showConfirmButton: boolean;
  showCancelButton: boolean;
}

const CustomAlertContent: React.FC<CustomAlertContentProps> = ({
  title,
  text,
  icon,
  footer,
  onConfirm,
  onCancel,
  confirmButtonText,
  cancelButtonText,
  showConfirmButton,
  showCancelButton,
}) => {
  const resolvedIcon =
    typeof icon === "string" ? icons[icon as keyof typeof icons] || icon : icon;

  return (
    <div className={styles.alertOverlay} onClick={onCancel}>
      <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>
        {resolvedIcon && <div className={styles.alertIcon}>{resolvedIcon}</div>}
        <div className={styles.alertContent}>
          <h2>
            <strong>{title}</strong>
          </h2>
          <div>
            <i>{text}</i>
          </div>
        </div>

        {(showConfirmButton || showCancelButton) && (
          <div className={styles.alertButtons}>
            {showCancelButton && (
              <button className={styles.cancelBtn} onClick={onCancel}>
                {cancelButtonText}
              </button>
            )}
            {showConfirmButton && (
              <button className={styles.confirmBtn} onClick={onConfirm}>
                {confirmButtonText}
              </button>
            )}
          </div>
        )}

        {footer && <div className={styles.alertFooter}>{footer}</div>}
      </div>
    </div>
  );
};

export default Alert

// Alert.show({
//     title: <strong>Внимание!</strong>,
//     html: <i>Это кастомный алерт без библиотек.</i>,
//     icon: 'warning',
//     footer: <small>Powered by React</small>,
//     showCancelButton: true,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       console.log('Пользователь нажал OK');
//     } else {
//       console.log('Пользователь нажал Отмена');
//     }
//   });
