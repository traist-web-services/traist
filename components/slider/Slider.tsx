import { useState, useEffect } from 'react';
import Slide from './Slide';

export default function Slider(props) {
  const slides = [{
    image: 'https://source.unsplash.com/random',
    text: 'Test text 1'
  },
  {
    image: 'https://source.unsplash.com/random',
    text: 'Test text 2'
  },
  {
    image: 'https://source.unsplash.com/random',
    text: 'Test text 3'
  }];

  const [slideToDisplay, setSlideToDisplay] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerPaused) {
        const nextSlide = slideToDisplay + 1 > slides.length - 1 ? 0 : (slideToDisplay + 1)
        setSlideToDisplay(nextSlide);
      }
    }, 2000)
    return () => clearInterval(interval);
  }, [slideToDisplay, timerPaused])

  return (
    <section
          className="relative min-h-screen bg-brand-500 p-24 flex flex-col items-center"
          onMouseOver={() => setTimerPaused(true)}
          onMouseOut={() => setTimerPaused(false)}
        >
      <div className="relative flex-grow overflow-x-hidden w-full h-full rounded-xl" id="slides">
        
      {slides.map((slide, index) => {
          return <Slide slide={slide} key={index} active={index === slideToDisplay} />
        })}
      </div>
      <div className="relative -bottom-12 text-white" id="slide-nav">
        {slides.map((slide, index) => {
            return (
              <span className={`mx-2 w-4 h-4 inline-block border border-white rounded-full duration-200 transition-color cursor-pointer ${slideToDisplay === index ? 'bg-white' : ''}`} onClick={() => setSlideToDisplay(index)} key={index}> </span>
            )
          })}        
      </div>
    </section>
  )
}
/*



(function() {
  if (!document.querySelector('#slides') || !document.querySelector('#slide-nav')) {
    return;
  }

  const TIMEOUT = document.querySelector('#slides').dataset.timeout || 15000;

  let interval = null;
  let slideToDisplay = 0;
  const slideFrame = document.querySelector('#slides');
  const slides = slideFrame.children;
  const nav = document.querySelector('#slide-nav');

  interval = setInterval(showNextSlide, TIMEOUT);

  slideFrame.parentElement.addEventListener('mouseover', () => {
    clearInterval(interval);
    interval = null;
  });

  slideFrame.parentElement.addEventListener('mouseout', () => {
    interval = interval ?? setInterval(showNextSlide, TIMEOUT);
  });

  for (let i = 0; i < slides.length; i++) {
    const navButton = document.createElement('span');
    navButton.classNameList.add(
      'mx-2',
      'w-4',
      'h-4',
      'inline-block',
      'border',
      'border-white',
      'rounded-full',
      'duration-200',
      'transition-color',
      'cursor-pointer'
    );
    navButton.innerText = ' ';
    navButton.addEventListener('click', () => {
      slideToDisplay = i;
      clearInterval(interval);
      showNextSlide();
      interval = interval ?? setInterval(showNextSlide, TIMEOUT);
    });
    nav.appendChild(navButton);
  }

  function showNextSlide() {
    for (let i = 0; i < slides.length; i++) {
      if (slideToDisplay === i) {
        slides[i].classNameList.add('-translate-x-full');
        nav.children[i].classNameList.add('bg-white');
      } else {
        slides[i].classNameList.remove('-translate-x-full');
        nav.children[i].classNameList.remove('bg-white');
      }
    }

    slideToDisplay++;

    if (slideToDisplay > (slides.length - 1)) {
      slideToDisplay = 0;
    }
  }

  showNextSlide();
})();
*/