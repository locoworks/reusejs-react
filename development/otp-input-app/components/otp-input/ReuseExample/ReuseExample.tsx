import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseExample = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10  bg-gray-50">
      <ReuseOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={null}
        renderInput={(props: any) => <input {...props} />}
        inputClassName="border-red-600 text-center"
        containerStyle="gap-2"
      />
    </div>
  );
};

export default ReuseExample;
