import Image from "next/image";
import Button from "../button/Button";
import ReactMarkdown from "react-markdown";

import { useContext } from "react";
import { InlineTextarea } from "react-tinacms-inline";
import InlineWysiwyg from "../inline-wysiwyg/InlineWysiwyg";
import DataContext from "../../contexts/DataContext";

import styles from "./Hero.module.scss";

const Hero = () => {
  const { subtitle }: { subtitle?: string } = useContext(DataContext);
  return (
    <section className={styles.heroSection}>
      <div className={styles.mountainContainer}>
        <Image
          src="/images/mountain-bg.jpg"
          alt=""
          role="presentation"
          layout="fill"
        />
        <div className={styles.colourOverlay}></div>
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <InlineTextarea name="title" />
        </h1>
        <div className={styles.subtitle}>
          <InlineWysiwyg name="subtitle" format="markdown">
            <ReactMarkdown source={subtitle} />
          </InlineWysiwyg>
        </div>
        <div className={styles.cta}>
          <Button type="link" href="/contact" colour="secondary" size="lg">
            What are you planning?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
