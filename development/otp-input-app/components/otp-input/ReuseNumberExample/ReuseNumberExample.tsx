import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseNumberExample = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={null}
        renderInput={(props: any) => (
          <input
            {...props}
            onWheel={(event) => {
              event.preventDefault();
            }}
          />
        )}
        inputClassName="text-center"
        containerStyle="gap-2"
        inputType="number"
      />
    </div>
  );
};

export default ReuseNumberExample;
