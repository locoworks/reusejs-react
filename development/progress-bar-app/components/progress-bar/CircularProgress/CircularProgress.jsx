import React, { useState } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const CircularProgress = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <CircularProgressBar
        progressInterval={2000}
        running={running}
        defaultProgress={0}
        progressText={(progress) => `Progress One ${progress} %`}
        progressTextClasses={"text-center font-extrabold"}
      />
      <CircularProgressBar
        progressInterval={2000}
        running={running}
        defaultProgress={0}
        radius={55}
        circleRadiusInPercentage="25%"
        totalFileSize={5000}
        processedFileSize={processedFile}
        progressColour="stroke-yellow-500"
        progressTextClasses={"text-center font-bold absolute"}
      />
      <CircularProgressBar
        progressInterval={4000}
        running={running}
        defaultProgress={0}
        radius={75}
        progressColour="stroke-blue-500"
        circleRadiusInPercentage="35%"
        progressText={(progress) => `Progress Three ${progress} %`}
        progressTextClasses={"text-center text-2xl"}
      />
      <ReuseButton
        className="bg-blue-500 text-white font-bold text-xl text-center mt-20 px-6 flex"
        onClick={() => setRunning(!running)}
      >
        {running ? "Pause" : "Play"}
      </ReuseButton>
    </div>
  );
};

export default CircularProgress;
