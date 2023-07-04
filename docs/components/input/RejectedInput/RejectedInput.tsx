import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const RejectedInput = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput type="text" className="bg-red-200  ring ring-inset focus:ring-red-300  focus:border-red-300 ring-red-400" placeholder="Enter Email" />
    </div>
  );
};

export default RejectedInput;
