import { useReducer } from "react";
import {
  GlobalContext,
  initialValues,
  type Action,
  type ContextTypes,
} from "./global.context";

interface Props {
  children: React.ReactNode;
}

// 2. The Reducer: The "Brain" that decides how state changes
function globalReducer(state: ContextTypes, action: Action): ContextTypes {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialValues);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
