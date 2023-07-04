import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const AcceptedInput = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput type="text" className="bg-green-200 ring ring-blue-400" placeholder="Enter Email" />
    </div>
  );
};

export default AcceptedInput;
