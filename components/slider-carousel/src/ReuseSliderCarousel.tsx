import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { useSlider } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

interface ReuseSliderCarouselInterface {
  slideInterval: number;
  slides: React.ReactNode[];
  loop: boolean;
  wrapperClasses?: string | CSSProperties;
  sliderContainerClasses?: string | CSSProperties;
  enableButtons?: boolean;
  previousButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  animationStyle?: string;
}

const ReuseSliderCarousel = ({
  slideInterval,
  slides,
  loop,
  wrapperClasses,
  sliderContainerClasses,
  enableButtons = false,
  previousButton,
  nextButton,
  animationStyle,
}: ReuseSliderCarouselInterface) => {
  const {
    currentSlide,
    currentSlideIndex,
    moveToNextSlide,
    moveToPreviousSlide,
    pauseSlider,
    moveSlider,
  } = useSlider({
    slideInterval,
    slides,
    loop,
  });

  const parentRef = useRef<HTMLDivElement>(null);
  let parent: any = parentRef.current;
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [childWidth, setChildWidth] = useState<number>(0);

  const HandleClickEvent = (e: any) => {
    if (!enableButtons) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const halfWidth = rect.width / 2;

      if (clickPosition > halfWidth) {
        moveToNextSlide();
      } else {
        moveToPreviousSlide();
      }
    }
  };

  const defaultWrapperClasses =
    "relative flex items-center justify-center h-full w-full bg-gray-200";

  const defaultSliderContainerClasses =
    "flex justify-center items-center h-full w-full shrink-0";

  const defaultButtonClasses =
    "flex h-10 w-10 rounded-full text-center mx-6 bg-white items-center justify-center cursor-pointer";

  const defaultPreviousButton = (
    <>
      {previousButton ? (
        previousButton
      ) : (
        <div className={defaultButtonClasses} onClick={moveToPreviousSlide}>
          <span>&#8810;</span>
        </div>
      )}
    </>
  );

  const defaultNextButton = (
    <>
      {nextButton ? (
        nextButton
      ) : (
        <div className={defaultButtonClasses} onClick={moveToPreviousSlide}>
          <span>&#8811;</span>
        </div>
      )}
    </>
  );

  const resumeSlides = () => {
    if (parent) {
      let autoScroll = async () => {
        setScrollLeft((prev) => {
          return prev + childWidth;
        });
        if (scrollLeft >= parent.scrollWidth - parent.clientWidth) {
          setScrollLeft(0);
        }
        parent.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      };
      autoScroll();
    }
  };

  useEffect(() => {
    parent = parentRef.current;
    if (parent) {
      setChildWidth(parent.clientWidth);
      setScrollLeft(parent.clientWidth);
    }
  }, []);

  useEffect(() => {
    resumeSlides();
  }, [currentSlideIndex]);

  return (
    <>
      {animationStyle === "continue" ? (
        <div
          className={
            typeof wrapperClasses === "string"
              ? twMerge(defaultWrapperClasses, wrapperClasses)
              : ""
          }
          style={typeof wrapperClasses === "object" ? wrapperClasses : {}}
          onClick={HandleClickEvent}
          onMouseEnter={pauseSlider}
          onMouseLeave={moveSlider}
        >
          <div
            className="flex h-full w-full items-center align-center  overflow-hidden text-center"
            ref={parentRef}
          >
            {slides.map((slide: any, index: number) => {
              return (
                <div
                  className="w-full h-full flex bg-green-300 shrink-0"
                  key={index}
                >
                  {slide}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className={
            typeof wrapperClasses === "string"
              ? twMerge(defaultWrapperClasses, wrapperClasses)
              : ""
          }
          style={typeof wrapperClasses === "object" ? wrapperClasses : {}}
          onClick={HandleClickEvent}
          onMouseEnter={pauseSlider}
          onMouseLeave={moveSlider}
        >
          {enableButtons && (
            <div className="absolute flex w-full justify-between px-6 h-fit items-center z-50">
              {defaultPreviousButton}
              {defaultNextButton}
            </div>
          )}
          <div
            className={
              typeof sliderContainerClasses === "string"
                ? twMerge(defaultSliderContainerClasses, sliderContainerClasses)
                : ""
            }
            style={
              typeof sliderContainerClasses === "object"
                ? sliderContainerClasses
                : {}
            }
          >
            {currentSlide}
          </div>
        </div>
      )}
    </>
  );
};

export default ReuseSliderCarousel;
