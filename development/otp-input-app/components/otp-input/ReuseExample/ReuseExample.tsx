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
        renderInput={(props: any) => <input {...props} />}
        inputStyle={{
          width: "48px",
          height: "56px",
          border: "1px solid green",
          borderRadius: "12px",
          fontSize: "23px",
          fontWeight: 600,
        }}
        containerStyle={{ gap: "8px" }}
      />
    </div>
  );
};

export default ReuseExample;
