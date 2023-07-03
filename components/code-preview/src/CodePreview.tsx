import React, { useState } from "react";
import CodeWrapper from "./CodeWrapper";
import CopyIcon from "./icons/CopyIcon";
import CodeIcon from "./icons/CodeIcon";

export interface CodePreviewProps {
  js: string;
  ts: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ js, ts }) => {
  const [showCode, setShowCode] = useState(true);
  const [shownCode, setShownCode] = useState("TS");

  const [showCopied, setShowCopied] = useState(false);

  const handlingShowCopied = () => {
    const code_to_be_copied = showCode
      ? shownCode === "JS"
        ? js
        : ts
      : "No Code To Show";
    navigator.clipboard.writeText(code_to_be_copied);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return (
    <div className="mt-0">
      <div className="my-2 flex justify-between">
        {showCode ? (
          <div className="">
            <button
              className={
                "px-2 py-1 mx-2 border border-black rounded font-bold " +
                (shownCode === "JS" ? "bg-gray-200" : "")
              }
              onClick={() => {
                setShownCode("JS");
              }}
            >
              JS
            </button>
            <button
              className={
                "px-2 py-1 mx-2 border border-black rounded font-bold " +
                (shownCode === "TS" ? "bg-gray-200" : "")
              }
              onClick={() => {
                setShownCode("TS");
              }}
            >
              TS
            </button>
          </div>
        ) : (
          <div />
        )}
        <div className="flex justify-center items-center">
          {showCode ? (
            <button
              className="relative h-10 w-10 px-2 py-1 mx-2 border border-gray-100 hover:bg-gray-200 rounded font-extrabold bg-gray-50"
              onClick={handlingShowCopied}
            >
              <div
                className={
                  "absolute -top-9 -left-5 bg-black px-3 py-2 border border-gray-400 rounded text-white font-normal transition-all " +
                  (showCopied ? "opacity-75" : "opacity-0 ")
                }
              >
                Copied
              </div>
              <CopyIcon />
            </button>
          ) : null}

          <button
            className="h-10 w-10 px-2 py-1 mx-2 border border-gray-100 hover:bg-gray-200 rounded font-extrabold bg-gray-50"
            onClick={() => {
              setShowCode(!showCode);
            }}
          >
            {<CodeIcon />}
          </button>
        </div>
      </div>

      {showCode && (js || ts) ? (
        <CodeWrapper
          language={shownCode === "JS" ? "language-js" : "language-ts"}
          code={shownCode === "JS" ? js : ts}
        />
      ) : null}
    </div>
  );
};

export default CodePreview;
