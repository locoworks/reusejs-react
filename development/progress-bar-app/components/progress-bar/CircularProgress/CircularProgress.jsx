import React, { useState } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const CircularProgress = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ProgressBar
        progressInterval={2000}
        running={running}
        defaultProgress={0}
        enableCircularProgress={true}
      />
      <ProgressBar
        progressInterval={2000}
        running={running}
        defaultProgress={0}
        enableCircularProgress={true}
        radius={55}
        circleRadiousInPercentage="25%"
        totalFileSize={5000}
        processedFileSize={processedFile}
      />
      <ProgressBar
        progressInterval={4000}
        running={running}
        defaultProgress={0}
        enableCircularProgress={true}
        radius={75}
        circleRadiousInPercentage="35%"
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
