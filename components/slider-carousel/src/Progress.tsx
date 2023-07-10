import React, { useState, useEffect, useRef, CSSProperties } from "react";

export interface ProgressInterface {
  index: number;
  totalSlideCount: number;
  progressInterval: number;
  isScrollPaused: boolean;
  active: number;
  setLastTime: React.Dispatch<React.SetStateAction<number>>;
  lastTime: number;
  slideChange: boolean;
  progressStyle?: string | CSSProperties;
  progressContainerStyles?: string | CSSProperties;
}
const Progress = ({
  index,
  progressInterval,
  progressContainerStyles,
  progressStyle,
  totalSlideCount,
  isScrollPaused,
  active,
  setLastTime,
  lastTime,
  slideChange,
}: ProgressInterface) => {
  const [progress, setProgress] = useState<number>(0);
  let currentProgressRef = useRef<number>(0);

  let interval: any = null;
  const targetProgress = 100;
  const duration = progressInterval;
  const increment = (targetProgress / duration) * 12;

  useEffect(() => {
    let intervalId: any;
    if (!isScrollPaused) {
      // setting time from lastTime + 100 in every 100 milisecond using javascript setInterval method
      intervalId = setInterval(() => setLastTime(lastTime + 100), 100);
    }

    if (lastTime >= progressInterval - 100 || slideChange == true) {
      setLastTime(0);
    }

    return () => clearInterval(intervalId);
  }, [isScrollPaused, lastTime]);

  useEffect(() => {
    const updateProgress = () => {
      if (isScrollPaused == false) {
        currentProgressRef.current += increment;
        if (slideChange == false) {
          setProgress(Math.min(currentProgressRef.current, targetProgress));
        } else {
          setProgress(0);
        }
      }

      if (isScrollPaused == true) {
        setProgress(currentProgressRef.current);
      }
      if (slideChange == true) {
        currentProgressRef.current = 0;
        setProgress(0);
      }
    };

    const startProgress = () => {
      interval = setInterval(() => {
        updateProgress();
      }, 10);
    };

    if (progress >= 100 && index != totalSlideCount - 1) {
      currentProgressRef.current = 0;
      setProgress(0);
    }

    const resetProgress = () => {
      clearInterval(interval);
      setProgress(0);
    };
    resetProgress();
    startProgress();

    return () => {
      clearInterval(interval);
    };
  }, [isScrollPaused, index, slideChange, active]);

  const getProgressStyle = (active: number) => {
    switch (active) {
      case 1:
        return { width: "100%" };

      case 2:
        return { width: `${progress}%` };

      case 0:
        return { width: "0%" };

      default:
        return { width: `0%` };
    }
  };

  useEffect(() => {
    currentProgressRef.current = 0;
    setProgress(0);
  }, [index, active, slideChange]);

  return (
    <div
      className={
        typeof progressContainerStyles === "string"
          ? progressContainerStyles
          : ""
      }
      style={
        typeof progressContainerStyles === "object"
          ? progressContainerStyles
          : {}
      }
    >
      <div
        key={"base" + index}
        className={typeof progressStyle === "string" ? progressStyle : ""}
        style={{
          ...getProgressStyle(active),
        }}
      ></div>
    </div>
  );
};

export default Progress;
