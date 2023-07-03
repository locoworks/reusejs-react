import React from "react";
import CodeWrapper from "./CodeWrapper";
import CodePreview from "./CodePreview";

type CodeProcessorType = (allCode: string) => React.ReactElement;

const CodeProcessor: CodeProcessorType = (allCode) => {
  const array = allCode.replace("[TO-SPLIT]", "").split("\n||||\n");
  const componentParms: { js?: string; ts?: string; preview?: string } = {};
  array.forEach((code: string) => {
    code.includes("[JSX]")
      ? (componentParms["js"] = code.replace("[JSX]\n", ""))
      : (componentParms["ts"] = code.replace("[TSX]\n", ""));
  });

  if (componentParms.js && componentParms.ts) {
    return <CodePreview js={componentParms.js} ts={componentParms.ts} />;
  } else {
    return <CodeWrapper language="language-js" code={"Error!!!"} />;
  }
};

export default CodeProcessor;
