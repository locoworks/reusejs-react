import React from "react";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const TextButton = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessButton
        className="w-fit py-2 rounded-lg text-red-500 hover:underline font-bold"
        onClick={() => {
          console.log("Headless button Clicked!!");
        }}
      >
        Click here
      </HeadlessButton>
    </div>
  );
};

export default TextButton;
