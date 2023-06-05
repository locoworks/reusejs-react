import React from "react";

export interface CodeWrapperProps {
  language: string;
  code: string;
}

const CodeWrapper: React.FC<CodeWrapperProps> = ({ language, code }) => {
  return (
    <pre className="border-2 border-transparent hover:border-blue-400 box-content my-0">
      <code lang={language}>{code}</code>
    </pre>
  );
};

export default CodeWrapper;
