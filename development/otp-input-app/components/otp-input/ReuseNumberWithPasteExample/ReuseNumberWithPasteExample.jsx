import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseNumberWithPasteExample = () => {
  const [otp, setOtp] = useState("");

  return (
    <ReuseOTPInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={null}
      renderInput={(props) => <input {...props} type="number" />}
      containerStyle="gap-2"
    />
  );
};

export default ReuseNumberWithPasteExample;
