import { GlobalContext, initialValues, type Theme } from "./global.context";

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }) => {
  return (
    <GlobalContext.Provider value={initialValues}>
      {children}
    </GlobalContext.Provider>
  );
};
