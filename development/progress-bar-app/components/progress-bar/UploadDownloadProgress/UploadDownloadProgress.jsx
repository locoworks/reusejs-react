import React, { useState, useRef, useEffect } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { start } from "repl";

const UploadDownloadProgress = () => {
  const [running, setRunning] = useState(false);
  const [processedFile, setProcessedFile] = useState(0);

  const processedFileRef = useRef(null);
  const StartUploadDownload = () => {
    processedFileRef.current = setInterval(() => {
      setProcessedFile((previousValue) => {
        return previousValue + 10;
      });
    }, 10);
  };

  useEffect(() => {
    if (processedFile === 5000) {
      clearInterval(processedFileRef.current);
    }
  }, [processedFile]);
  return (
    <div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="w-full h-72 flex flex-col justify-center items-center mx-80">
        <ProgressBar
          progressInterval={2000}
          running={running}
          defaultProgress={0}
          progressContainerClasses="bg-black h-6 flex"
          progressClasses="h-full"
          processedFileSize={processedFile}
          totalFileSize={5000}
        />
        <ProgressBar
          progressInterval={2000}
          running={running}
          defaultProgress={0}
          progressContainerClasses="bg-yellow-200 h-6 flex mt-10"
          progressClasses="h-full"
          processedFileSize={processedFile}
          totalFileSize={5000}
        />
        <ReuseButton
          className="bg-blue-500 text-white font-bold text-2xl text-center mt-20 px-6 flex"
          onClick={() => {
            setRunning(true);
            StartUploadDownload();
          }}
        >
          Start Download/Upload
        </ReuseButton>
      </div>
    </div>
  );
};

export default UploadDownloadProgress;
