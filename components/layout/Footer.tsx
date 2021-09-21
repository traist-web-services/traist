import Link from "next/link";
import EditLink from "../edit-link/EditLink";
import Menu from "../menu/Menu";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCol}>
        <h1 className={styles.footerTitle}>Traist Web Services &copy; 2021</h1>
        <p>
          <a href="mailto:hi@traist.co.uk" className={styles.contactLink}>
            hi@traist.co.uk
          </a>
        </p>
      </div>
      <div className={styles.footerCol}>
        <h1 className={styles.footerTitle}>Pages</h1>
        <Menu simple={true} />
        <EditLink className={styles.lowercaseText} />
      </div>
      <div className={`${styles.footerCol} ${styles.footerCol__noBorder}`}>
        <h1 className={styles.footerTitle}>About</h1>
        <p>
          Traist Web Services is a digital consultancy firm building exceptional
          user experiences for small to medium businesses.
        </p>
        <h1 className={styles.footerTitle}>Personal Data</h1>
        <p>
          Traist cares about your privacy rights online. We only store data
          you've expressly chosen to share with us (eg: by sending a message
          through the form embedded on the site, or using the chat function). We
          use third party providers for this who have their own privacy
          policies, which we are satisfied with but you may want to check
          yourself (Formspree and Chatwoot). We gather some analytics data
          ourselves using a tool called 'Offen'. All data is deleted after six
          months. You can see the data we have about you (and delete it if you
          like) by accessing{" "}
          <a href="https://offen.traist.co.uk" target="_blank">
            offen.traist.co.uk
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
