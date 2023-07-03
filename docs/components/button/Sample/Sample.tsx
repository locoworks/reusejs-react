import React, { useState } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const Sample = () => {
  const [busy, setBusy] = useState(false);

  const handleClick = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
    }, 1500);
  };

  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseButton
        className="cursor-pointer w-28"
        busy={busy}
        onClick={() => {
          handleClick();
        }}
      >
        Reuse!
      </ReuseButton>
    </div>
  );
};

export default Sample;
