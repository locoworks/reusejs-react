import React, { useEffect, useRef, useState } from "react";
import { CircularProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const CircularProgress = () => {
  const [runningOne, setRunningOne] = useState<boolean>(false);
  const [runningTwo, setRunningTwo] = useState<boolean>(false);
  const [runningThree, setRunningThree] = useState<boolean>(false);
  const [processedFile, setProcessedFile] = useState<number>(0);

  const processedFileRef = useRef<NodeJS.Timeout | null>(null);
  const StartUploadDownload = () => {
    clearInterval(processedFileRef.current as NodeJS.Timeout);
    processedFileRef.current = setInterval(() => {
      setProcessedFile((previousValue) => {
        return previousValue + 10;
      });
    }, 10);
  };

  const gradient =
    "linear-gradient(to right, green 0%, green 33%, yellow 34%, yellow 66%, red 67%, red 100%)";

  useEffect(() => {
    if (processedFile === 5000) {
      clearInterval(processedFileRef.current as NodeJS.Timeout);
    }
  }, [processedFile]);
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="flex justify-evenly w-full">
        <CircularProgressBar
          progressInterval={2000}
          running={runningOne}
          defaultProgress={0}
          progressText={(progress: number) => `Progress One ${progress} %`}
          progressTextClasses={"text-center font-extrabold"}
          outerCircleClasses={"stroke-green-500"}
        />
        <CircularProgressBar
          progressInterval={2000}
          running={runningTwo}
          defaultProgress={0}
          radius={55}
          circleRadiusInPercentage="25%"
          totalFileSize={5000}
          processedFileSize={processedFile}
          outerCircleClasses={"stroke-yellow-500"}
          progressTextClasses={"text-center font-bold absolute"}
        />
        <CircularProgressBar
          progressInterval={4000}
          running={runningThree}
          defaultProgress={0}
          radius={75}
          outerCircleClasses={{
            stroke: "red",
          }}
          circleRadiusInPercentage="35%"
          progressText={(progress: number) => {
            return progress >= 0 && progress <= 33
              ? "Low Risk"
              : progress > 33 && progress <= 66
              ? "Medium Risk"
              : "High Risk";
          }}
          progressTextClasses={"text-center text-2xl"}
        />
      </div>

      <div className="flex w-full justify-around items-center">
        <ReuseButton
          className="bg-blue-500 text-white font-bold text-xl text-center mt-20 px-6 flex"
          onClick={() => {
            setRunningOne(!runningOne);
          }}
        >
          {runningOne ? "Pause" : "Play"}
        </ReuseButton>
        <ReuseButton
          className="bg-blue-500 text-white font-bold text-xl text-center mt-20 px-6 flex"
          onClick={() => {
            setRunningTwo(true);
            StartUploadDownload();
          }}
        >
          {runningTwo ? "Pause" : "Play"}
        </ReuseButton>
        <ReuseButton
          className="bg-blue-500 text-white font-bold text-xl text-center mt-20 px-6 flex"
          onClick={() => {
            setRunningThree(!runningThree);
          }}
        >
          {runningThree ? "Pause" : "Play"}
        </ReuseButton>
      </div>
    </div>
  );
};

export default CircularProgress;
