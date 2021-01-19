import styles from "./Toast.module.scss";
import Tick from "../icons/Tick";
import Error from "../icons/Error";
import { useEffect, useState } from "react";

interface Props {
  type: "success" | "error" | null;
  message: string;
}

const Toast = ({ type, message }: Props) => {
  const [display, setDisplay] = useState(false);
  const icon = type === "success" ? <Tick /> : <Error />;
  useEffect(() => {
    setDisplay(type !== null);
    const timer = setTimeout(() => setDisplay(false), 5000);
    return () => clearTimeout(timer);
  }, [type]);
  return (
    <div
      className={`${styles.toastContainer} ${styles[type]} ${
        display ? styles.display : ""
      }`}
    >
      <span className={styles.toastIcon}>{icon}</span>{" "}
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};

export default Toast;
