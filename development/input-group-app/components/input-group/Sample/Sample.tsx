import React, { useState } from "react";
import { HeadlessInputGroup } from "@locoworks/reusejs-react-input-group";

const Sample = () => {
  const [showError, setShowError] = useState(false);
  const Header = <label className="font-bold ">Sample</label>;

  const Helper = <label className="font-bold ">This is helper text</label>;

  const Error = (
    <label className="text-red-400">This is an error message</label>
  );

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessInputGroup
        wrapperClasses="w-1/2"
        header={Header}
        className={
          "form-input px-3 w-full py-2 border-1 rounded focus:ring-0 " +
          (showError
            ? " border-red-400 focus:border-red-500"
            : "border-black focus:border-blue-700 ")
        }
        error={showError && Error}
        helper={Helper}
      />
      <button
        className="bg-red-500 px-3 py-1 text-white font-bold rounded mt-4 hover:bg-red-600"
        onClick={() => setShowError(!showError)}
      >
        Click
      </button>
    </div>
  );
};

export default Sample;
