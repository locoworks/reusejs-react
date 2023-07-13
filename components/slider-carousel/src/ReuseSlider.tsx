import React, { useState, useEffect, useRef, CSSProperties } from "react";
import SliderProgress from "./Progress";

interface statusInterface {
  statusArray: React.ReactNode[];
  slideInterval?: number;
  progressStyle?: string | CSSProperties;
  progressContainerStyles?: string | CSSProperties;
  SliderContainerStyles?: string | CSSProperties;
  sliderWrapperClasses?: string;
  footer?: React.ReactNode;
  loop?: boolean;
  nextButton?: React.ReactNode;
  prevButton?: React.ReactNode;
  enableButton?: boolean;
  progressPosition?: string;
}
const nextBtn = () => {
  return (
    <div className="absolute top-1/2 bottom-1/2 right-5 flex -rotate-270 p-4 justify-center items-center rounded-full bg-black opacity-75 h-10 w-10 z-10">
      <span>&#8811;</span>
    </div>
  );
};

const prevBtn = () => {
  return (
    <div className="absolute top-1/2 bottom-1/2 left-5 flex rotate-270 p-4 justify-center items-center rounded-full bg-black opacity-75 h-10 w-10 z-10">
      <span>&#8810;</span>
    </div>
  );
};

const ReuseSlider = ({
  slideInterval = 2000,
  statusArray,
  progressStyle,
  progressContainerStyles,
  SliderContainerStyles,
  sliderWrapperClasses,
  progressPosition,
  footer,
  loop,
  enableButton = false,
  nextButton = nextBtn(),
  prevButton = prevBtn(),
}: statusInterface) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isScrollPaused, setScrollPaused] = useState(false);
  const [remainingPauseTime, setRemainingPauseTime] = useState<any>(null);
  const [preIndex, setPreIndex] = useState<number>();
  const [lastTime, setLastTime] = useState<number>(0);
  const [slideChange, setSlideChange] = useState<boolean>(false);

  const intervalRef = useRef<any>(null);
  const currentStatus = statusArray[currentStatusIndex];

  let remainingTime =
    preIndex == currentStatusIndex && lastTime > 0
      ? slideInterval - lastTime
      : slideInterval;

  const startAutoScroll = () => {
    clearInterval(intervalRef.current);
    if (!isScrollPaused && loop) {
      setCurrentStatusIndex((preindex) => {
        const nextIndex = preindex == statusArray.length - 1 ? 0 : preindex + 1;
        return nextIndex;
      });
    } else if (!isScrollPaused && !loop) {
      if (currentStatusIndex < statusArray.length - 1) {
        setCurrentStatusIndex((preindex) => {
          const nextIndex = preindex + 1;
          return nextIndex;
        });
      } else if (currentStatusIndex == statusArray.length - 1) {
        setCurrentStatusIndex(currentStatusIndex);
      }
      if (currentStatusIndex != statusArray.length - 1) {
      }
    }
  };

  const handlePrevStatus = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setScrollPaused(true);
    remainingTime = slideInterval;
    loop
      ? setCurrentStatusIndex(
          currentStatusIndex > 0
            ? currentStatusIndex - 1
            : statusArray.length - 1
        )
      : setCurrentStatusIndex(
          currentStatusIndex > 0 ? currentStatusIndex - 1 : 0
        );
    handleScrollResume();
    setSlideChange(true);
  };

  const handleNextStatus = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setScrollPaused(true);
    remainingTime = slideInterval;
    loop
      ? setCurrentStatusIndex(
          currentStatusIndex < statusArray.length - 1
            ? currentStatusIndex + 1
            : 0
        )
      : setCurrentStatusIndex(
          currentStatusIndex < statusArray.length - 1
            ? currentStatusIndex + 1
            : statusArray.length - 1
        );
    handleScrollResume();
    setSlideChange(true);
  };

  const handleScrollResume = () => {
    clearInterval(intervalRef.current);
    setScrollPaused(false);
    setSlideChange(false);
    setRemainingPauseTime(0);
    intervalRef.current = setInterval(() => {
      if (!isScrollPaused) {
        startAutoScroll();
      }
    }, remainingTime);
  };

  const handleScrollPause = () => {
    clearInterval(intervalRef.current);
    setRemainingPauseTime(Date.now());
    setPreIndex(currentStatusIndex);
    setScrollPaused(true);
  };

  const handleStatusClick = (e: any) => {
    if (enableButton == false) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const halfWidth = rect.width / 2;
      if (clickPosition < halfWidth) {
        handlePrevStatus();
      } else {
        handleNextStatus();
      }
    }
  };

  useEffect(() => {
    if (!isScrollPaused) {
      handleScrollResume(); // Initial resume
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isScrollPaused, currentStatusIndex, remainingPauseTime]);

  return (
    <div
      className={
        typeof sliderWrapperClasses === "string" ? sliderWrapperClasses : ""
      }
      style={
        typeof sliderWrapperClasses === "object" ? sliderWrapperClasses : {}
      }
    >
      <div
        className={
          typeof SliderContainerStyles === "string" ? SliderContainerStyles : ""
        }
        style={
          typeof SliderContainerStyles === "object" ? SliderContainerStyles : {}
        }
      >
        <div
          className={
            typeof progressPosition === "string" ? progressPosition : ""
          }
          style={typeof progressPosition === "object" ? progressPosition : {}}
        >
          {statusArray.map((item: any, index: number) => (
            <SliderProgress
              key={index}
              setLastTime={setLastTime}
              lastTime={lastTime}
              index={index}
              totalSlideCount={statusArray.length}
              progressInterval={slideInterval}
              slideChange={slideChange}
              isScrollPaused={isScrollPaused}
              progressStyle={progressStyle}
              progressContainerStyles={progressContainerStyles}
              active={
                index < currentStatusIndex
                  ? 1
                  : index === currentStatusIndex
                  ? 2
                  : 0
              }
            />
          ))}
        </div>

        {enableButton === true && prevButton ? (
          <div className="flex text-white" onClick={handlePrevStatus}>
            {prevButton}
          </div>
        ) : (
          prevBtn()
        )}
        {enableButton === true && nextButton ? (
          <div className="flex text-white" onClick={handleNextStatus}>
            {nextButton}
          </div>
        ) : (
          nextBtn()
        )}

        <div
          className=""
          onClick={handleStatusClick}
          onMouseEnter={handleScrollPause}
          onMouseLeave={handleScrollResume}
          onTouchStart={handleScrollPause}
          onTouchEnd={handleScrollResume}
          onTouchCancel={handleScrollResume}
        >
          {currentStatus}

          <div className="flex w-full justify-center items-center">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReuseSlider;
