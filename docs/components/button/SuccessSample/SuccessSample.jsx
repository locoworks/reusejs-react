import React, { useState } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const SuccessSample = () => {
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("Register");

  const handleClick = () => {
    setBusy(true);
    setTimeout(() => {
      setText("Sucess");
      setBusy(false);
    }, 1500);
  };

  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseButton
        className={
          "cursor-pointer w-28" + (text === "Sucess" ? " bg-green-500" : "")
        }
        busy={busy}
        onClick={() => {
          handleClick();
        }}
      >
        {text}
      </ReuseButton>
    </div>
  );
};

export default SuccessSample;
