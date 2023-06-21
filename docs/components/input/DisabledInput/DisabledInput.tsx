import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const DisabledInput = () => {
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput
        disabled={true}
        placeholder="Disabled"
        className="bg-gray-200"
      />
    </div>
  );
};

export default DisabledInput;
