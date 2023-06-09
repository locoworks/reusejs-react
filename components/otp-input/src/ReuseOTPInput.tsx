import React, { useState } from "react";
import { HeadlessOTPInput } from "@locoworks/reusejs-react-otp-input";
import { HeadlessOTPInputProps } from "./HeadlessOTPInput";

export interface ReuseOTPInputProps extends HeadlessOTPInputProps {}

const ReuseOTPInput: React.FC<ReuseOTPInputProps> = ({
  value = "",
  numInputs = 4,
  onChange,
  renderInput,
  shouldAutoFocus = false,
  inputType = "text",
  renderSeparator,
  placeholder,
  containerStyle,
  inputStyle,
}) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={null}
        renderInput={(props: any) => <input {...props} />}
        inputStyle={{
          width: "48px",
          height: "56px",
          backgroundColor: "#D3D3D3",
          border: "2px solid green",
          borderRadius: "12px",
          fontSize: "23px",
          fontWeight: 600,
        }}
        containerStyle={{ gap: "8px" }}
      />
    </div>
  );
};
export default ReuseOTPInput;
