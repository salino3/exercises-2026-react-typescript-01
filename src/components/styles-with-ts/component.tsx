import type React from "react";
import { stylesTag } from "./styles";

export const TestComponent: React.FC = () => {
  return (
    <div style={stylesTag("red")} className="rootTestComponent">
      <div style={{ borderBottom: "solid", width: "100%" }}>
        <strong>Hi there!</strong>
      </div>
    </div>
  );
};
