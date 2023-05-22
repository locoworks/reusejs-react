import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Sample from "./docs/Sample.mdx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="flex justify-center">
      <div className="prose">
        <Sample />
      </div>
    </div>
  </React.StrictMode>
);
