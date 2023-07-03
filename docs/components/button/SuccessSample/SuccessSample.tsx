import React, { useState } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import CheckIcon from "./icons/CheckIcon";

const SuccessSample = () => {
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("Register");

  const handleClick = () => {
    setBusy(true);
    setTimeout(() => {
      setText("Success");
      setBusy(false);
    }, 1500);
  };

  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseButton
        className={
          "cursor-pointer w-1/2" +
          (text === "Success"
            ? " bg-green-500 gap-x-2 hover:bg-green-500 cursor-default"
            : "")
        }
        busy={busy}
        disabled={text === "Success" ? true : false}
        onClick={() => {
          handleClick();
        }}
        buttonPrefix={text === "Success" ? <CheckIcon /> : <></>}
      >
        {text}
      </ReuseButton>
    </div>
  );
};

export default SuccessSample;
