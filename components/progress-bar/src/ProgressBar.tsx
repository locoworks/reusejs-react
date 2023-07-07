import React, { CSSProperties, useEffect, useState } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";
import { type } from "os";

interface ProgressBarInterface {
  progressClasses?: string | CSSProperties;
  progressContainerClasses?: string | CSSProperties;
  progressInterval: number;
  running: boolean;
  defaultProgress: number;
  totalFileSize?: number;
  processedFileSize?: number;
  progressText?: string;
  progressTextClasses?: string | CSSProperties;
  radius?: number;
  circleRadiousInPercentage?: string;
  enableCircularProgress?: boolean;
  StrokeColour?: string;
  progressColour?: string;
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
  radius = 95,
  circleRadiousInPercentage,
  enableCircularProgress,
  StrokeColour,
  progressColour,
}: ProgressBarInterface) => {
  const defaultProgressClasses = "flex h-full rounded-full bg-green-600";
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
    const circumference = 2 * Math.PI * radius; // Calculate the circumference of the circle
    const offset = circumference - (progress / 100) * circumference; // Calculate the offset for the border

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
    <>
      {enableCircularProgress ? (
        <div
          className={`h-full w-full flex justify-center items-center ${
            typeof progressContainerClasses === "string"
              ? twMerge(
                  defaultProgressContainerClasses,
                  progressContainerClasses
                )
              : defaultProgressContainerClasses
          }`}
          style={
            typeof progressContainerClasses === "object"
              ? progressContainerClasses
              : {}
          }
        >
          <svg
            className={`w-52 h-52 rounded-full ${
              typeof progressClasses === "string" ? progressClasses : ""
            }`}
          >
            <circle
              className={`fill-transparent stroke-[10] -rotate-90 origin-center stroke-gray-300 ${StrokeColour}`}
              cx="50%"
              cy="50%"
              r={circleRadiousInPercentage ? circleRadiousInPercentage : "45%"}
              style={statusStyle}
            ></circle>
            <circle
              className={`fill-transparent stroke-[10] -rotate-90 origin-center stroke-green-500 ${progressColour}`}
              cx="50%"
              cy="50%"
              r={circleRadiousInPercentage ? circleRadiousInPercentage : "45%"}
              style={progressStyle}
            ></circle>
          </svg>
          <span className="absolute text-2xl font-bold">
            {progressText}
            {progress}%
          </span>
        </div>
      ) : (
        <>
          <div
            className={
              typeof progressContainerClasses === "string"
                ? twMerge(
                    defaultProgressContainerClasses,
                    progressContainerClasses
                  )
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
                  : ""
              }
              style={
                typeof progressClasses === "object"
                  ? { ...progressClasses, width: `${progress}%` }
                  : { width: `${progress}%` }
              }
            ></div>
          </div>
          {progressText && progress > 0 && (
            <div
              className={
                typeof progressTextClasses === "string"
                  ? progressTextClasses
                  : ""
              }
            >
              {progressText} {progress}%
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProgressBar;
