import React from "react";
import {
  ReuseButton,
  RedButton,
  YellowButton,
} from "@locoworks/reusejs-react-button";

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
