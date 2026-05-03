import styles from "./styles.module.css";
import clsx from "clsx";

type StyleConfig = "red" | "blue" | "green";

export const TestComponent = ({
  color = "blue",
  cursor = "progress", //"pointer",
}: {
  color: StyleConfig;
  cursor: string;
}) => {
  return (
    <div
      className={clsx(styles.rootTestComponent)}
      style={
        {
          "--bg-color": color,
          "--cursor": cursor,
        } as React.CSSProperties
      }
    >
      <div style={{ borderBottom: "solid", width: "100%" }}>
        <strong>Hi there!</strong>
      </div>
    </div>
  );
};
