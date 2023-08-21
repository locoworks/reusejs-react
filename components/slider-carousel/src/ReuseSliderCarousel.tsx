import React, { CSSProperties } from "react";
import { useSlider } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";
interface ReuseSliderCarouselInterface {
  slides: React.ReactNode[];
  loop: boolean;
  slideInterval?: number;
  wrapperClasses?: string | CSSProperties;
  sliderContainerClasses?: string | CSSProperties;
  enableButtons?: boolean;
  previousButton?: React.ReactNode;
  nextButton?: React.ReactNode;
}

const ReuseSliderCarousel = ({
  slideInterval = 2000,
  slides,
  loop,
  wrapperClasses,
  sliderContainerClasses,
  enableButtons = false,
  previousButton,
  nextButton,
}: ReuseSliderCarouselInterface) => {
  const {
    currentSlide,
    moveToNextSlide,
    moveToPreviousSlide,
    pauseSlider,
    moveSlider,
  } = useSlider({
    slideInterval,
    slides,
    loop,
  });

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

  return (
    <div
      className={
        typeof wrapperClasses === "string"
          ? twMerge(defaultWrapperClasses, wrapperClasses)
          : defaultWrapperClasses
      }
      style={typeof wrapperClasses === "object" ? wrapperClasses : {}}
      onClick={HandleClickEvent}
      onMouseEnter={pauseSlider}
      onMouseLeave={moveSlider}
      onTouchStart={pauseSlider}
      onTouchEnd={moveSlider}
      onTouchCancel={moveSlider}
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
            : defaultSliderContainerClasses
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
  );
};

export default ReuseSliderCarousel;
