import React, { useState } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const RoundedProgress = () => {
  const [running, setRunning] = useState(false);
  return (
    <div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="w-full h-72 flex flex-col justify-center items-center mx-80">
        <ProgressBar
          progressInterval={2000}
          running={running}
          defaultProgress={0}
          progressContainerClasses="bg-gray-300 h-6 flex"
          progressClasses="h-full"
        />
        <ReuseButton
          className="bg-blue-500 text-white font-bold text-2xl text-center mt-20 px-6 flex"
          onClick={() => setRunning(!running)}
        >
          Play & Pause
        </ReuseButton>
      </div>
    </div>
  );
};

export default RoundedProgress;
