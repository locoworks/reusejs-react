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
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: "48px",
          height: "56px",
          backgroundColor: "#D3D3D3",
          border: "none",
          borderStyle: "none",
          borderRadius: "12px",
          fontSize: "23px",
          fontWeight: 600,
        }}
        containerStyle={{ gap: "8px" }}
      />
    </div>
  );
};

export default Sample;
