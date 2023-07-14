import React, { CSSProperties, useEffect, useState } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

interface ProgressBarInterface {
  progressInterval: number;
  defaultProgress: number;
  running: boolean;
  totalFileSize?: number;
  processedFileSize?: number;
  progressClasses?: string | CSSProperties;
  progressContainerClasses?: string | CSSProperties;
  progressText?: (progressValue: number) => React.ReactNode | string;
  progressTextClasses?: string | CSSProperties;
  progressLoop?: boolean;
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

  const { progress } = useProgress({
    progressInterval,
    running,
    defaultProgress,
    totalFileSize,
    processedFileSize,
  });

  return (
    <>
      <div
        className={
          typeof progressContainerClasses === "string"
            ? twMerge(defaultProgressContainerClasses, progressContainerClasses)
            : defaultProgressContainerClasses
        }
        style={
          typeof progressContainerClasses === "object"
            ? progressContainerClasses
            : {}
        }
      >
        <div
          className={
            typeof progressClasses === "string"
              ? twMerge(defaultProgressClasses, progressClasses)
              : defaultProgressClasses
          }
          style={
            typeof progressClasses === "object"
              ? { ...progressClasses, width: `${progress}%` }
              : { width: `${progress}%` }
          }
        ></div>
      </div>
      {progressText && (
        <div
          className={
            typeof progressTextClasses === "string" ? progressTextClasses : ""
          }
          style={
            typeof progressTextClasses === "object" ? progressTextClasses : {}
          }
        >
          {progressText(progress)}
        </div>
      )}
    </>
  );
};

export default ProgressBar;
