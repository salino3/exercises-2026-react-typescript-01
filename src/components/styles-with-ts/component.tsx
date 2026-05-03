import { useState } from "react";
import styles from "./styles.module.css";
// import { stylesTag } from "./styles";
import clsx from "clsx";

type StyleConfig = "red" | "blue" | "green";

export const TestComponent = ({
  color = "blue",
  cursor = "progress", //"pointer",
}: {
  color: StyleConfig;
  cursor: string;
}) => {
  const [isDimmed, setIsDimmed] = useState<boolean>(false);
  return (
    <div
      className={clsx(styles.rootTestComponent)}
      style={
        {
          "--bg-color": color,
          "--cursor": cursor,
          "--bright": isDimmed ? 0.1 : 0.9,
        } as React.CSSProperties
      }
    >
      <div style={{ borderBottom: "solid", width: "100%" }}>
        <strong>Hi there!</strong>
        <button onClick={() => setIsDimmed(!isDimmed)}>
          Toggle Brightness
        </button>
      </div>
    </div>
  );
};
