import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const OutlineButton = () => {
  return (
    <div>
      <ReuseButton
        className="border-2 border-blue-600 bg-transparent font-bold text-blue-600 py-1 px-2"
        onClick={() => {
          console.log("Hello");
        }}
      >
        Clicky!
      </ReuseButton>
    </div>
  );
};

export default OutlineButton;
