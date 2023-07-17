import React, { createRef, useRef, useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const Prefix = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 font-bold">
      Pre
    </div>
  );
};

const Suffix = () => {
  return (
    <button
      className="absolute top-1/2 -translate-y-1/2 right-2 font-bold"
      onClick={() => {
        alert("Suffix button Clicked!!!");
      }}
    >
      Suffix
    </button>
  );
};

const Forwardrefinput = () => {
  const forwardinputRef = useRef(null);

  const handleClick = () => {
    alert(forwardinputRef.current.value);
  };

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInputGroup
        className="pl-10 pr-14"
        headerText="Reuse Input Group"
        helperStyles="mt-2"
        helperText="This text is for Helping!!"
        prefix={<Prefix />}
        suffix={<Suffix />}
        reuseinputref={forwardinputRef}
      />
      <div className="flex mt-6 gap-x-10">
        <HeadlessButton
          className="px-3 py-1 border border-blue-500 bg-blue-200 rounded"
          onClick={handleClick}
        >
          Get input Text
        </HeadlessButton>
      </div>
    </div>
  );
};

export default Forwardrefinput;
