import React, { useEffect, useRef, useState } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const CircularProgress = () => {
  const [running, setRunning] = useState<boolean>(false);
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

  useEffect(() => {
    if (processedFile === 5000) {
      clearInterval(processedFileRef.current as NodeJS.Timeout);
    }
  }, [processedFile]);
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="flex justify-evenly w-full">
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
          progressColour="stroke-yellow-500"
        />
        <ProgressBar
          progressInterval={4000}
          running={running}
          defaultProgress={0}
          enableCircularProgress={true}
          radius={75}
          circleRadiousInPercentage="35%"
          progressColour="stroke-blue-500"
        />
      </div>

      <ReuseButton
        className="bg-blue-500 text-white font-bold text-xl text-center mt-20 px-6 flex"
        onClick={() => {
          setRunning(!running);
          StartUploadDownload();
        }}
      >
        {running ? "Pause" : "Play"}
      </ReuseButton>
    </div>
  );
};

export default CircularProgress;
