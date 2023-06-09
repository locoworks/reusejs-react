import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseExample = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={null}
        renderInput={(props) => <input {...props} />}
        inputStyle="w-16 h-14 bg-slate-300 border border-green-600 rounded-sm text-2xl font-semibold"
        containerStyle={{ gap: "8px" }}
      />
    </div>
  );
};

export default ReuseExample;
