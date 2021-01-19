import Link from "next/link";
import EditLink from "../edit-link/EditLink";
import Menu from "../menu/Menu";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCol}>
        <h5 className={styles.footerTitle}>Traist Web Services &copy; 2021</h5>
        <p>
          <a href="mailto:hi@traist.co.uk" className={styles.contactLink}>
            hi@traist.co.uk
          </a>
        </p>
      </div>
      <div className={styles.footerCol}>
        <h5 className={styles.footerTitle}>Pages</h5>
        <Menu simple={true} />
        <EditLink className={styles.lowercaseText} />
      </div>
      <div className={`${styles.footerCol} ${styles.footerCol__noBorder}`}>
        <h1 className={styles.footerTitle}>About</h1>
        <p>
          Traist Web Services is a digital consultancy firm building exceptional
          user experiences for small to medium businesses.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
