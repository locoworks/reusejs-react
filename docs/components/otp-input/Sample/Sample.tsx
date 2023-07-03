import React, { useState } from "react";
import { HeadlessOTPInput } from "@locoworks/reusejs-react-otp-input";

const Sample = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={null}
        renderInput={(props: any) => <input {...props} />}
        containerStyle="gap-2"
        inputStyle="w-12 h-14 bg-slate-300 text-center border rounded-xl text-2xl font-semibold"
      />
    </div>
  );
};

export default Sample;
