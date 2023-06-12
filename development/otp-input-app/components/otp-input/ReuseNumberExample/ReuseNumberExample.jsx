import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseNumberExample = () => {
  const [otp, setOtp] = useState("");

  return (
    <ReuseOTPInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={null}
      renderInput={(props) => <input {...props} />}
      containerStyle="gap-2"
      inputType="number"
    />
  );
};

export default ReuseNumberExample;
