import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const SizeInput = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput
        type="text"
        className="text-xl "
        placeholder="Big Email Input"
      /> 
    
    </div>
  );
};

export default SizeInput;
