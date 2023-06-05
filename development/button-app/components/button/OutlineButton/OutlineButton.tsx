import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const OutlineButton = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseButton
        className="border-2 border-blue-600 bg-transparent font-bold text-blue-600 py-1 px-2"
        onClick={() => {
          console.log("Hello");
        }}
      >
        Clicky!
      </ReuseButton>
      <ReuseButton
        className="border-2 border-red-600 bg-transparent font-bold text-red-600 py-1 px-2"
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
