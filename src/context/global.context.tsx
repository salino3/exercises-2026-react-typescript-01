import { createContext } from "react";

export type Theme = "light" | "dark";

type ContextTypes = {
  id?: string;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  user: {
    name: string;
    age: number;
  };
};

export const initialValues: ContextTypes = {
  id: "sde4rfe4",
  theme: "light",
  setTheme: () => {},
  user: { name: "Joe", age: 50 },
};

export const GlobalContext = createContext<ContextTypes>(initialValues);
