// Next Imports
import Head from "next/head";
import Image from "next/image";

import { useGithubToolbarPlugins } from "react-tinacms-github";

// My Components
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ContactForm from "../components/contact-form/ContactForm";
import styles from "./contact.module.scss";

const Contact = () => {
  useGithubToolbarPlugins();
  return (
    <Layout>
      <Head>
        <title>Traist - Contact Us</title>
      </Head>
      <Header />
      <div className={styles.imageContainer}>
        <Image src="/images/mountain-bg.jpg" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.articleContainer}>
          <article className={styles.article}>
            <h1 className={styles.title}>Contact Us</h1>
            <div className={styles.content}>
              <ContactForm displayChrome={false} />
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Contact;
