import { useState } from "react";
import { GlobalContext, initialValues, type Theme } from "./global.context";

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState({ name: "Joe", age: 50 });

  const contextValue = {
    id: "sde4rfe4",
    theme,
    setTheme,
    user,
    setUser,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
