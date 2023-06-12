import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseExample = () => {
  const [otp, setOtp] = useState("");

  return (
    <ReuseOTPInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      renderSeparator={null}
      renderInput={(props) => <input {...props} />}
      containerStyle="gap-2"
    />
  );
};

export default ReuseExample;
