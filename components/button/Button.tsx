import Link from "next/link";
import styles from "./Button.module.scss";

interface Props {
  colour?: "primary" | "secondary";
  size?: "xl" | "lg" | "md" | "sm";
  type: "submit" | "reset" | "link";
  href: string;
  children: string | undefined;
  onClick?: () => void;
  rest?: any[];
}

const Button = ({
  colour = "primary",
  size = "md",
  type = "submit",
  href,
  children,
  ...rest
}: Props) => {
  if (type === "link") {
    return (
      <span className={`${styles.button} ${styles[size]} ${styles[colour]}`}>
        <Link href={href ?? "#"} {...rest}>
          {children}
        </Link>
      </span>
    );
  }
  if (type === "submit" || type === "reset") {
    return (
      <input
        type={type}
        className={`${styles.button} ${styles[size]} ${styles[colour]}`}
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
