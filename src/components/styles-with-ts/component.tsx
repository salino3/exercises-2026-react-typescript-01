import { useState } from "react";
// import styles from "./styles.module.css";
// import { stylesTag } from "./styles";
// import clsx from "clsx";
import "./component.styles.scss";

type StyleConfig = "red" | "blue" | "green";

export const TestComponent = ({
  bgColor = "blue",
  color = "red",
  cursor = "progress", // "pointer",
}: {
  bgColor: StyleConfig;
  color: string;
  cursor: string;
}) => {
  const [isDimmed, setIsDimmed] = useState<boolean>(false);
  return (
    <div
      //   style={stylesTag("blue")}
      className={"rootTestComponent"}
      //   className={clsx(styles.rootTestComponent)}
      style={
        {
          "--bg-color": bgColor,
          "--cursor": cursor,
          "--bright": isDimmed ? 0.1 : 0.9,
        } as React.CSSProperties
      }
    >
      <div style={{ borderBottom: "solid", width: "100%" }}>
        <strong
          style={
            {
              "--color": color,
            } as React.CSSProperties
          }
        >
          Hi there!
        </strong>
        &nbsp;
        <button onClick={() => setIsDimmed(!isDimmed)}>
          Toggle Brightness
        </button>
      </div>
    </div>
  );
};
