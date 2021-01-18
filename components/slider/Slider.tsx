import { useState, useEffect, ReactChild } from "react";
import Slide, { SlideObject } from "./Slide";
import styles from "./Slider.module.scss";

interface Props {
  slides: SlideObject[];
}
const Slider = ({ slides }: Props) => {
  const [slideToDisplay, setSlideToDisplay] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerPaused) {
        const nextSlide =
          slideToDisplay + 1 > slides.length - 1 ? 0 : slideToDisplay + 1;
        setSlideToDisplay(nextSlide);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [slideToDisplay, timerPaused]);

  return (
    <section
      className={styles.sliderSection}
      onMouseOver={() => setTimerPaused(true)}
      onMouseOut={() => setTimerPaused(false)}
    >
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => {
          return (
            <Slide
              slide={slide}
              key={index}
              active={index === slideToDisplay}
              index={index}
            />
          );
        })}
      </div>
      <div className={`${styles.slidePager}`}>
        {slides.map((slide, index) => (
          <span
            className={`${styles.slidePagerItem} ${
              slideToDisplay === index ? styles.slidePagerItem__active : ""
            }`}
            onClick={() => setSlideToDisplay(index)}
            key={index}
          >
            {" "}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Slider;
