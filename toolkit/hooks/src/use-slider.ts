import React, { useState, useEffect, useRef } from "react";

interface SliderInterfacer {
  slides: React.ReactNode[];
  slideInterval: number;
  loop: boolean;
}

export let useSlider = ({ slides, slideInterval, loop }: SliderInterfacer) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const currentSlide = slides[currentSlideIndex];
  const intervalRef = useRef<any>(null);
  const [timeWhenHovered, setTimeWhenHovered] = useState<number>(0);
  const [previousIndex, setPreviousIndex] = useState<number>();
  const [timer, setTimer] = useState<boolean>(true);

  let remainingPauseTime =
    previousIndex === currentSlideIndex &&
    timeWhenHovered > 0 &&
    timeWhenHovered < slideInterval
      ? slideInterval - timeWhenHovered
      : slideInterval;

  const startSlider = () => {
    if (loop === true) {
      setCurrentSlideIndex((previndex) => {
        const nextIndex = previndex === slides.length - 1 ? 0 : previndex + 1;
        return nextIndex;
      });
    }

    if (loop === false) {
      if (currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex((preindex) => {
          const nextIndex = preindex + 1;
          return nextIndex;
        });
      }
    }
  };

  const moveSlider = () => {
    clearInterval(intervalRef.current);
    setTimer(true);
    intervalRef.current = setInterval(() => {
      startSlider();
    }, remainingPauseTime);
  };

  const moveToNextSlide = () => {
    if (loop === true) {
      setCurrentSlideIndex((previndex) => {
        const nextIndex = previndex === slides.length - 1 ? 0 : previndex + 1;
        return nextIndex;
      });
    } else {
      setCurrentSlideIndex((previndex) => {
        const nextIndex =
          previndex === slides.length - 1 ? slides.length - 1 : previndex + 1;
        return nextIndex;
      });
    }
  };

  const moveToPreviousSlide = () => {
    if (loop == true) {
      setCurrentSlideIndex((previndex) => {
        const nextIndex = previndex > 0 ? previndex - 1 : slides.length - 1;
        return nextIndex;
      });
    } else {
      setCurrentSlideIndex((previndex) => {
        const nextIndex = previndex > 0 ? previndex - 1 : 0;
        return nextIndex;
      });
    }
  };

  const pauseSlider = () => {
    clearInterval(intervalRef.current);
    setPreviousIndex(currentSlideIndex);
    setTimer(false);
  };

  useEffect(() => {
    let sliderTimePassed: any;
    if (timer === true) {
      sliderTimePassed = setInterval(() => {
        setTimeWhenHovered((prevTime) => prevTime + 100);
      }, 100);
    }

    return () => {
      clearInterval(sliderTimePassed);
    };
  }, [timeWhenHovered, timer]);

  useEffect(() => {
    setTimeWhenHovered(0);
    remainingPauseTime = slideInterval;
    moveSlider();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentSlideIndex]);

  return {
    currentSlideIndex,
    currentSlide,
    moveSlider,
    moveToNextSlide,
    moveToPreviousSlide,
    pauseSlider,
  };
};
