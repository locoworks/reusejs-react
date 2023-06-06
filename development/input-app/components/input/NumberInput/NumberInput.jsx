import { ReuseInput } from "@locoworks/reusejs-react-input";
import React from "react";

const NumberInput = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput type="number" className="" />
    </div>
  );
};

export default NumberInput;
