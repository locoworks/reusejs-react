import React, { useState } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

interface ProgressBarInterface {
  progressClasses?: string;
  progressContainerClasses?: string;
  progressInterval: number;
  running: boolean;
  defaultProgress: number;
  totalFileSize?: number;
  processedFileSize?: number;
  progressText?: string;
  progressTextClasses?: string;
}

const ProgressBar = ({
  progressClasses,
  progressContainerClasses,
  progressInterval,
  running,
  defaultProgress,
  totalFileSize = 0,
  processedFileSize = 0,
  progressText,
  progressTextClasses,
}: ProgressBarInterface) => {
  const defaultProgressClasses = "flex h-full rounded-full bg-green-600";
  const defaultProgressContainerClasses =
    "flex h-2 rounded-md mx-1 w-full rounded-full overflow-hidden";

  const finalProgressClasses = twMerge(defaultProgressClasses, progressClasses);

  const finalProgressContainerClasses = twMerge(
    defaultProgressContainerClasses,
    progressContainerClasses
  );
  const { progress } = useProgress({
    progressInterval,
    running,
    defaultProgress,
    totalFileSize,
    processedFileSize,
  });

  return (
    <>
      <div className={finalProgressContainerClasses}>
        <div
          className={finalProgressClasses}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progressText && progress > 0 && (
        <div className={progressTextClasses}>
          {progressText} {progress}%
        </div>
      )}
    </>
  );
};

export default ProgressBar;
