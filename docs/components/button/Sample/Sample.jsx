import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const Sample = () => {
  return (
    <div>
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
