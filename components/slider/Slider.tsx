import { useState, useEffect, ReactChild } from 'react';
import Slide, { SlideObject } from './Slide';


export default function Slider(props) {

  const [slideToDisplay, setSlideToDisplay] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerPaused) {
        const nextSlide = slideToDisplay + 1 > props.slides.length - 1 ? 0 : (slideToDisplay + 1)
        setSlideToDisplay(nextSlide);
      }
    }, 20000)
    return () => clearInterval(interval);
  }, [slideToDisplay, timerPaused])

  return (
    <section
          className="relative min-h-screen bg-brand-500 p-4 md:p-12 lg:p-24 flex flex-col items-center"
          onMouseOver={() => setTimerPaused(true)}
          onMouseOut={() => setTimerPaused(false)}
        >
      <div className="relative flex-grow overflow-x-hidden w-full h-full rounded-xl" id="slides">
        
      {props.slides.map((slide: SlideObject, index: number) => {
          return <Slide slide={slide} key={index} active={index === slideToDisplay} index={index} />
        })}
      </div>
      <div className="relative -bottom-12 text-white" id="slide-nav">
        {props.slides.map((slide: SlideObject, index: number) => (
            <span className={`hidden lg:block mx-2 w-4 h-4 border border-white rounded-full duration-200 transition-color cursor-pointer ${slideToDisplay === index ? 'bg-white' : ''}`} onClick={() => setSlideToDisplay(index)} key={index}> </span>
          ))}        
      </div>
    </section>
  )
}