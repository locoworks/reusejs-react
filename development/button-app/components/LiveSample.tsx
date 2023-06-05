import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
// import Sample from "./button/Sample/Sample.tsx";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const LiveSample = () => {
  const scope = { HeadlessButton };

  const code = `
<HeadlessButton 
  className="bg-red-300 border-2 border-red-400 px-2 py-1 font-bold hover:border-blue-500 hover:bg-blue-500 transition-all" 
  onClick={()=>console.log("Hello")}
>
  Click!!
</HeadlessButton>
`;

  return (
    <LiveProvider code={code} scope={scope} language={"tsx"}>
      <div className="flex justify-center items-center bg-gray-50 border rounded min-h-[100px]">
        <LivePreview />
      </div>
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  );
};

export default LiveSample;
