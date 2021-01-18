import Head from "next/head";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className={styles.outerContainer}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.innerContainer}>{children}</main>
    </div>
  );
};

export default Layout;
