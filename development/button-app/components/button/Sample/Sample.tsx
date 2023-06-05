import React from "react";
import {
  ReuseButton,
  RedButton,
  YellowButton,
} from "@locoworks/reusejs-react-button";

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
      <RedButton
        onClick={() => {
          console.log("Hello");
        }}
      >
        Red!
      </RedButton>

      <YellowButton
        onClick={() => {
          console.log("Hello");
        }}
      >
        Yellow!
      </YellowButton>
    </div>
  );
};

export default Sample;
