import React, { useState } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { CircularProgressBar } from "@locoworks/reusejs-react-progress-bar";

const CircularProgress = () => {
  const [runningOne, setRunningOne] = useState(false);
  const [runningTwo, setRunningTwo] = useState(false);
  const [runningThree, setRunningThree] = useState(false);
  const [processedFile, setProcessedFile] = useStat(0);

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="flex justify-evenly items-center w-full">
        <CircularProgressBar
          progressInterval={2000}
          running={runningOne}
          defaultProgress={0}
          radius={80}
          circleRadiusInPercentage="48%"
          progressText={(progress) => `Progress One ${progress} %`}
          progressTextClasses={"text-center font-extrabold mt-4"}
          outerCircleClasses={"stroke-green-600"}
          progressClasses={"bg-indigo-950 h-40 w-40"}
        />
        <CircularProgressBar
          progressInterval={2000}
          running={runningTwo}
          defaultProgress={0}
          radius={60}
          circleRadiusInPercentage="50%"
          totalFileSize={5000}
          processedFileSize={processedFile}
          outerCircleClasses={"stroke-yellow-500"}
          progressTextClasses={"absolute text-white font-bold"}
          progressClasses={"h-[120px] w-[120px] bg-cyan-800"}
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
          progressText={(progress) => {
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
