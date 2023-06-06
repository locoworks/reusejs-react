import React from "react";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const HeadlessSample = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessButton
        className="w-1/2 bg-red-400 hover:bg-red-500 py-2 rounded-lg text-white font-bold"
        onClick={() => {
          console.log("Headless button Clicked!!");
        }}
      >
        Click here
      </HeadlessButton>
    </div>
  );
};

export default HeadlessSample;
