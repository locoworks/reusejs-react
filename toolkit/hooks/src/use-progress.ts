import React, { useState, useEffect, useRef } from "react";

interface UseProgresInterface {
  progressInterval?: number;
  running: boolean;
  defaultProgress?: number;
  totalFileSize?: number;
  processedFileSize?: number;
  progressLoop?: boolean
}

export let useProgress = ({
  progressInterval = 4000,
  running = false,
  defaultProgress = 0,
  totalFileSize = 0,
  processedFileSize = 0,
  progressLoop = false,
}: UseProgresInterface) => {
  const [progress, setProgress] = useState<number>(defaultProgress);
  const [currentFileProcessed, setCurrentFileProcessed] = useState<number>(0);

  let currentProgressRef = useRef<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const increment = (100 / progressInterval) * 12;

  const updateProgress = () => {
    if (totalFileSize === 0) {
      currentProgressRef.current += increment;
      const currentProgress = Number(currentProgressRef.current.toFixed(0));
      setProgress(Math.min(currentProgress, 100));
    }
    if (totalFileSize > 0) {
      currentProgressRef.current = currentFileProcessed;
      setProgress(currentProgressRef.current);
    }
  };

  const start = () => {
    intervalRef.current = setInterval(() => {
      updateProgress();
    }, 10);
  };

  const pause = () => {
    if (progress > 0 && progress < 100) {
      const currentProgress: number = Number(
        currentProgressRef.current.toFixed(0)
      );
      setProgress(currentProgress);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  useEffect(() => {
    if (running === true) {
      if (progress < 100) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        start();
      }
      if (progress >= 100) {
        stop();
      }
    }
    if (running === false) {
      if (totalFileSize === 0) {
        pause();
      }

      if (totalFileSize > 0) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        start();
      }
    }
  }, [running]);

  useEffect(() => {
    if (progress < 100 && totalFileSize !== 0 && progressLoop === false ) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      start();
    }
    else if (totalFileSize !== 0 && progressLoop === true ) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      start();
    }

    const processedFileInPercent: number =
      (processedFileSize / totalFileSize) * 100;
    setCurrentFileProcessed(Number(processedFileInPercent.toFixed(0)));
  }, [processedFileSize]);

  return {
    progress,
  };
};
