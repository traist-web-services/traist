import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "../button/Button";

import styles from "./Slide.module.scss";

export interface SlideObject {
  text: string;
  image: string;
  title: string;
  linkTo: string;
}
interface Props {
  active: boolean;
  slide: SlideObject;
  index: number;
}

const Slide = ({ active, slide, index }: Props) => {
  const { text, image, title, linkTo } = slide;
  return (
    <>
      <div
        key={index}
        className={`${styles.slide} ${active ? styles.slide__display : ""}`}
      >
        <div className={styles.image}>
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>

        <div className={styles.text}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.textProse}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <Button size="lg" href={linkTo} type="link">
              How can we help?
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
