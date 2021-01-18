import styles from "./Header.module.scss";

import Link from "next/link";
import Menu from "../menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <Link href="/">Traist Web Services</Link>
        </div>
        <div>
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
