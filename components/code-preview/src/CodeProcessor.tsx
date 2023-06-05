import React from "react";
import CodeWrapper from "./CodeWrapper";
import CodePreview from "./CodePreview";

type CodeProcessorType = (allCode: string) => React.ReactElement;

const CodeProcessor: CodeProcessorType = (allCode) => {
  const array = allCode.split("\n||||\n");
  const componentParms: { js?: string; ts?: string; preview?: string } = {};
  array.forEach((code: string) => {
    if (code.includes("[preview]")) {
      componentParms["preview"] = code
        ?.replaceAll("[TO-SPLIT]", "")
        ?.replaceAll("[preview]\n", "");
    } else if (code.includes("[TSX]")) {
      componentParms["ts"] = code
        ?.replaceAll("[TO-SPLIT]", "")
        ?.replaceAll("[TSX]\n", "");
    } else if (code.includes("[JSX]")) {
      componentParms["js"] = code
        ?.replaceAll("[TO-SPLIT]", "")
        ?.replaceAll("[JSX]\n", "");
    }
  });

  if (componentParms.js && componentParms.ts) {
    return (
      <CodePreview
        js={componentParms.js}
        ts={componentParms.ts}
        preview={componentParms.preview}
      />
    );
  } else {
    return <CodeWrapper language="language-js" code={"Error!!!"} />;
  }
};

export default CodeProcessor;
