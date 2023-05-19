import React, { useState } from "react";
import {
  HeadlessButton,
  ReuseButton,
} from "@shared-test/reusejsv2-sample-button";
import {
  ReuseTextInput,
  ReusePasswordInput,
} from "@shared-test/reusejsv2-sample-text-input";
import {
  ReuseLoginForm,
  useHeadlessLogin,
} from "@shared-test/reusejsv2-sample-login-form";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// const SyntaxHighlighter = require('react-syntax-highlighter').Prism;
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Web() {
  const [busy, setBusy] = useState(false);

  const { email, setEmail, password, setPassword, handleLogin } =
    useHeadlessLogin({ loginAPI: "sample" });

  const code = (
    <ReuseButton
      className="mt-2"
      onClick={() => {
        const sample = document.getElementById("code-sample");
        console.log("sample>>>", sample);
        // setBusy(true);
        // setTimeout(() => {
        //   // handleLogin();
        //   setBusy(false);
        // }, 3000);
      }}
      busy={busy}
    >
      Reuse Test Button
    </ReuseButton>
  );

  return (
    <div className="">
      <h1 className="text-3xl">Web</h1>

      {/* <div className="w-1/3 flex flex-col items-center mx-auto ">
        <ReuseTextInput
          className="px-2"
          placeholder="Email"
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
          error={email === "" && "Please Enter an Email Address"}
        />
        <ReusePasswordInput
          className="px-2"
          placeholder="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
        />
        
      </div> */}
      <ReuseLoginForm />
      <div className="w-full flex justify-center" id="code-sample">
        <ReuseButton
          className="mt-2"
          onClick={() => {
            const sample = document.getElementById("code-sample");
            console.log("sample>>>", sample);
            // setBusy(true);
            // setTimeout(() => {
            //   // handleLogin();
            //   setBusy(false);
            // }, 3000);
          }}
          busy={busy}
        >
          Reuse Test Button
        </ReuseButton>
      </div>
    </div>
  );
}
