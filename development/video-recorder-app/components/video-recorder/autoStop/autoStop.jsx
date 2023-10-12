import React, { useRef, useState } from "react";
import HeadlessVideoRecorder from "@locoworks/reusejs-react-video-recorder";

const AutoStopVideoRecorder = () => {
  const videoRecorderRef = useRef(null);
  const [recordingState, setRecordingState] = useState("inactive");

  const downloadHandler = () => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.handleDownload();
    } else {
      console.error("videoRecorderRef is null");
    }
  };

  const showPreview = () => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.showPreview();
    } else {
      console.error("videoRecorderRef is null");
    }
  };

  const RetakeButton = ({ onRetake }) => {
    return (
      <button className="p-2 bg-blue-200 border" onClick={onRetake}>
        Retake Recording
      </button>
    );
  };

  const CountDown = ({ count }) => {
    return (
      <div className="flex p-2 font-semibold border">
        00:{count < 10 ? `0${count}` : count}
      </div>
    );
  };

  const StartRecording = ({ onStart }) => {
    return (
      <button className="p-2 bg-blue-200 border" onClick={onStart}>
        Start Recording
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
      <HeadlessVideoRecorder
        ref={videoRecorderRef}
        autoPreview={false}
        autoStop={true}
        timeInMs={8000}
        customDownloadButton={(onDownload) => <></>}
        handleStateChange={(state) => setRecordingState(state)}
        customRetakeButton={(onRetake) => (
          <RetakeButton onRetake={onRetake} />
        )}
        customCountDown={(count) => <CountDown count={count} />}
        customStartRecording={(onStart) => <StartRecording onStart={onStart} />}
      />

      {recordingState === "inactive" && (
        <button className="p-2 bg-blue-300 border" onClick={showPreview}>
          Show Preview
        </button>
      )}
      {recordingState === "recorded" && (
        <button className="bg-blue-300 border -2" onClick={downloadHandler}>
          Download Video in Parent
        </button>
      )}
    </div>
  );
};

export default AutoStopVideoRecorder;
