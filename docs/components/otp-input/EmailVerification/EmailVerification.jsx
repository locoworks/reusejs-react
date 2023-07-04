import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("ab**@xyz.com");

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10  bg-gray-50">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {email}</p>
        </div>
      </div>
      <ReuseOTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={null}
        renderInput={(props) => <input {...props} />}
        inputClassName="w-16 h-16 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
        containerStyle="gap-2"
      />
      <div className="flex flex-col space-y-5">
        <div>
          <button className="flex flex-row items-center mt-5 justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
            Verify Account
          </button>
        </div>

        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
          <p>{`Didn't recieve code?`}</p>{" "}
          <a
            className="flex flex-row items-center text-blue-600"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
