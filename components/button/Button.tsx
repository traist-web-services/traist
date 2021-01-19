import Link from "next/link";
import styles from "./Button.module.scss";
import forwardRef from "react";

interface Props {
  colour?: "primary" | "secondary";
  size?: "xl" | "lg" | "md" | "sm";
  type: "submit" | "reset" | "link";
  href: string;
  children: string | undefined;
  onClick?: () => void;
  rest?: any[];
  disabled?: boolean;
}

const Button = ({
  colour = "primary",
  size = "md",
  type = "submit",
  href,
  children,
  disabled,
  ...rest
}: Props) => {
  if (type === "link") {
    return (
      <Link href={href ?? "#"} {...rest} passHref>
        <a className={`${styles.button} ${styles[size]} ${styles[colour]}`}>
          {children}
        </a>
      </Link>
    );
  }
  if (type === "submit" || type === "reset") {
    return (
      <input
        type={type}
        disabled={disabled}
        className={`${styles.button} ${styles[size]} ${styles[colour]} ${
          disabled ? styles.disabled : ""
        }`}
        value={children}
      />
    );
  }
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[colour]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
