import React, { CSSProperties } from "react";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const CSSStyledButton = () => {
  const styles: CSSProperties = {
    background: "#5555ff",
    fontWeight: 700,
    color: "white",
    padding: "10px 20px 10px 20px",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <HeadlessButton style={styles}>Button</HeadlessButton>
    </div>
  );
};

export default CSSStyledButton;
