import { type CSSProperties } from "react";

// Definimos un tipo para los argumentos si quieres restringir colores
type StyleConfig = "red" | "blue" | "green";

export const stylesTag = (color: StyleConfig): CSSProperties => ({
  background: color,
  padding: "5rem",
  display: "flex",
  justifyContent: "center",
  borderRadius: "2px",
});
