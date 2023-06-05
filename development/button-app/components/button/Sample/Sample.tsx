import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const Sample = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseButton
        onClick={() => {
          console.log("Hello");
        }}
      >
        Reuse!
      </ReuseButton>
    </div>
  );
};

export default Sample;
