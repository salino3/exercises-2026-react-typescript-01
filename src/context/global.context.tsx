import { createContext } from "react";

export type Theme = "light" | "dark";

export type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "UPDATE_USER"; payload: { name: string; age: number } };

export type ContextTypes = {
  id?: string;
  theme: Theme;
  user: {
    name: string;
    age: number;
  };
  dispatch: React.Dispatch<Action>;
};

export const initialValues: ContextTypes = {
  id: "sde4rfe4",
  theme: "light",
  user: { name: "Joe", age: 50 },
  dispatch: () => {},
};

export const GlobalContext = createContext<ContextTypes>(initialValues);
