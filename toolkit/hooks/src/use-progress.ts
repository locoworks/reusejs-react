import React, { useState, useEffect, useRef } from "react";

// Auto compute progress
// Manual progress

const useProgress = ({
  progressInterval = 4000,
  running = false,
  defaultProgress = 0,
  totalFileSize = 0,
  processedFileSize = 0,
}: any) => {
  const [progress, setProgress] = useState<number>(defaultProgress); // 0
  const [currentFileProcessed, setCurrentFileProcessed] = useState<number>(0);

  let currentProgressRef = useRef<number>(0); //0

  const intervalRef = useRef<any>(null);
  const increment = (100 / progressInterval) * 10; //0.03

  const updateProgress = () => {
    if (totalFileSize == 0) {
      currentProgressRef.current += increment;
      const currentProgress = Number(currentProgressRef.current.toFixed(0)); // Convert to number
      setProgress(Math.min(currentProgress, 100));
    }
    if (totalFileSize > 0) {
      currentProgressRef.current = currentFileProcessed;
      setProgress(currentProgressRef.current);
    }
  };

  const start = () => {
    // Always start a new interval
    intervalRef.current = setInterval(() => {
      updateProgress();
    }, 10);
  };

  const pause = () => {
    if (progress > 0 && progress < 100) {
      const currentProgress: any = currentProgressRef.current.toFixed(0);
      setProgress(currentProgress);
      clearInterval(intervalRef.current);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (running == true) {
      if (progress < 100) {
        clearInterval(intervalRef.current);
        start();
      }
      // If progress is full, let's stop "clearInterval"
      if (progress >= 100) {
        stop();
      }
    }
    if (running === false) {
      if (totalFileSize == 0) {
        pause();
      }

      if (totalFileSize > 0) {
        clearInterval(intervalRef.current);
        start();
      }
    }
  }, [running]);

  useEffect(() => {
    if (progress < 100 && totalFileSize !== 0) {
      clearInterval(intervalRef.current);
      start();
    }
    const processedFileInPercent: any =
      (processedFileSize / totalFileSize) * 100;
    setCurrentFileProcessed(processedFileInPercent.toFixed(0));
    console.log("processedFile", processedFileInPercent);
  }, [processedFileSize]);

  return {
    progress,
  };
};

export default useProgress;
