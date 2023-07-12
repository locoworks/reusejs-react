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
  radius?: number;
  circleRadiusInPercentage?: string;
  strokeColour?: string;
  progressColour?: string;
}

const CircularProgressBar = ({
  progressClasses,
  progressContainerClasses,
  progressInterval,
  running,
  defaultProgress,
  totalFileSize = 0,
  processedFileSize = 0,
  progressText,
  progressTextClasses,
  radius = 95,
  circleRadiusInPercentage = "45%",
  strokeColour,
  progressColour,
}: ProgressBarInterface) => {
  const defaultProgressContainerClasses =
    "flex h-2 rounded-md mx-1 w-full rounded-full overflow-hidden";

  const [progressStyle, setProgressStyle] = useState({});
  const [statusStyle, setStatusStyle] = useState({});

  const { progress } = useProgress({
    progressInterval,
    running,
    defaultProgress,
    totalFileSize,
    processedFileSize,
  });

  useEffect(() => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    setProgressStyle({
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset,
    });

    setStatusStyle({
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 0,
    });
  }, [progress]);
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${
        typeof progressContainerClasses === "string"
          ? twMerge(defaultProgressContainerClasses, progressContainerClasses)
          : defaultProgressContainerClasses
      }`}
      style={
        typeof progressContainerClasses === "object"
          ? progressContainerClasses
          : {}
      }
    >
      <div className="flex flex-col justify-center -items-center">
        <svg
          className={`w-52 h-52 rounded-full ${
            typeof progressClasses === "string" ? progressClasses : ""
          }`}
          style={typeof progressClasses === "object" ? progressClasses : {}}
        >
          <circle
            className={`fill-transparent stroke-[10] -rotate-90 origin-center stroke-gray-300 ${strokeColour}`}
            cx="50%"
            cy="50%"
            r={circleRadiusInPercentage}
            style={statusStyle}
          ></circle>
          <circle
            className={`fill-transparent stroke-[10] -rotate-90 origin-center stroke-green-500 ${progressColour}`}
            cx="50%"
            cy="50%"
            r={circleRadiusInPercentage}
            style={progressStyle}
          ></circle>
        </svg>
        {progressText && progress > 0 && (
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
      </div>
      {!progressText && progress > 0 && (
        <div
          className={` ${
            typeof progressTextClasses === "string" ? progressTextClasses : ""
          }`}
        >
          {progress}%
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
